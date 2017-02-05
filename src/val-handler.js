import val from './val';
import {
  run,
} from './util';
import * as defaults from './extensions/defaults';

// ======================================================
// Creating chainable handler for a type.
// Includes extensions
// ======================================================

export default function ValHandler(expectedType, extensions) {

  // Bind require and all extensions to the updated object in chain.
  extensions = [defaults].concat(extensions || []);
  const bindAllExtensions = (valObj) => {
    valObj.test = valObj.__test.bind(null, valObj);
    valObj.nested = valObj.__nested.bind(valObj, valObj);
    valObj.setValue = valObj.__setValue.bind(null, valObj);
    valObj.require = valObj.__setValue.bind(null, valObj, '__required', true);
    valObj.extend = valObj.__extend.bind(null, valObj);
    valObj.__extensions.forEach((ext) => {
      Object.entries(ext).forEach(([name, handler]) => {
        valObj[name] = runExtension.bind(null, {name, handler}, valObj);
      })
    });
  };

  // Handler for when an extension get ran. Handles chaining.
  const runExtension = (ext, valObj, ...args) => {
    const { name, handler } = ext;
    valObj = Object.assign({}, valObj);
    valObj.__chain = valObj.__chain.concat([{ name, handler, args }]);
    bindAllExtensions(valObj);
    return valObj;
  };

  // Setting initial val object.
  let valObj = {
    __type: expectedType,
    __chain: [],
    __extensions: extensions,
    __required: false,
    __nested: run,
    __setValue: (resObj, key, value) => {
      resObj = Object.assign({}, resObj);
      resObj[key] = value;
      bindAllExtensions(resObj);
      return resObj;
    },
    __test: (resObj, value, options) => val(value, resObj, options),
    __extend: (resObj, ext) => {
      resObj.__extensions.push(ext); // deliberately mutate extensions to work globally
      bindAllExtensions(resObj);
    },

  };

  // And bind extensions to have the valObj for chaining
  bindAllExtensions(valObj);

  // start the chain with the typechecker
  valObj = valObj.__typeChecker(expectedType);

  return valObj;
};
