import {
  genError,
} from './util';

const globalOptions = {
  promise: false,
  resolveOnly: false,
  runCondition: () => true,
};

// ======================================================
// Helper function to run down the tree.
// Used for recursive handling of types.
// ======================================================

export const run = (object, key, value) => {
  let error = null;
  const hasValue = (typeof value !== 'undefined' && value !== null);
  if (typeof object === 'object' && object.__rootChecker) {
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
// Main function - this is run by the user
// ======================================================

export const val = (obj, schema, options) => {
  if (typeof obj !== 'object') {
    return 'val can only validate objects (first param)';
  }
  if (typeof schema !== 'object') {
    return 'val requires a schema as object (second param)';
  }
  const error = Object.entries(schema).map(([key, checker]) => {
    const value = obj[key];
    return run(checker, key, value);
  }).filter(v => !!v)[0];
  const mergedOptions = Object.assign({}, globalOptions, options);
  if (mergedOptions.promise) {
    return new Promise((resolve, reject) => {
      if (mergedOptions.resolveOnly) {
        resolve(error);
      } else {
        error ? reject(error) : resolve();
      }
    });
  }
  return error || null;
};
val.setGlobal = (key, value) => {
  globalOptions[key] = value;
};


// ======================================================
// All Types should be an instance of this
// Creating chainable type checker.
// ======================================================

export const TypeChecker = (validate, extensions) => {
  // Bind require and all extensions
  const bindAllExtensions = (valObj) => {
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
