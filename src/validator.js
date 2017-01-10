import {
  genError,
  isValHandler,
} from './util';

// ======================================================
// Helper function to run down the tree.
// Used for recursive handling of types.
// ======================================================

export const run = (object, key, value) => {
  let error = null;
  const hasValue = (typeof value !== 'undefined' && value !== null);
  if (isValHandler(object)) {
    if (object.__required && !hasValue) {
      error = genError(key, 'required');
    } else if (hasValue) {
      error = object.__rootChecker(key, value);
      if (!error) {
        error = object.__chain.map(({
          handler,
          args,
        }) => genError(key, handler(value, ...args))).filter(v => !!v)[0];
      }
    }
  } else {
    return genError(key, 'wrong handler in scheme');
  }
  return error;
};


// ======================================================
// All Types should be an instance of this
// Creating chainable type checker.
// ======================================================

export const TypeChecker = (validate, extensions) => {
  // Bind require and all extensions
  const bindAllExtensions = (valObj) => {
    valObj.run = valObj.__run.bind(null, valObj);
    valObj.require = valObj.__orgRequire.bind(null, valObj);
    valObj.extend = valObj.__extend.bind(null, valObj);
    valObj.__extensions.forEach((ext) => {
      valObj[ext.name] = runExtension.bind(null, ext, valObj);
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
  const valObj = {
    __rootChecker: validate,
    __chain: [],
    __extensions: extensions || [],
    __required: false,
    __run: (resObj, value) => run(resObj, '', value),
    __orgRequire: (resObj) => {
      resObj = Object.assign({}, resObj);
      resObj.__required = true;
      bindAllExtensions(resObj);
      return resObj;
    },
    __extend: (resObj, ext) => {
      resObj.__extensions.push(ext); // deliberately mutate extensions to work globally
      bindAllExtensions(resObj);
    },
  };
  // And bind extensions to have the valObj for chaining
  bindAllExtensions(valObj);

  return valObj;
};
