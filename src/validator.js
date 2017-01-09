import {
  getType,
  genError,
} from './util';

export const run = (object, key, value) => {
  let error = null;
  const hasValue = (typeof value !== 'undefined' && value !== null);
  if (typeof object === 'object' && object.__typeChecker) {
    if (object.__required && !hasValue) {
      error = genError(key, 'required');
    } else if (hasValue) {
      error = object.__typeChecker(key, value);
      if (!error) {
        error = object.__handlers.map(({
          handler,
          args,
        }) => genError(key, handler(value, ...args))).filter(v => !!v)[0];
      }
    }
  }
  return error;
};

export const val = (obj, schema) => {
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
  return error || null;
};

export const createChainableTypeChecker = (validate, extensions) => {
  const orgExt = {};
  if (!extensions) {
    extensions = [];
  }

  function extendFunction({ name, handler }) {
    return (resObj, ...args) => {
      resObj = Object.assign({}, resObj);
      resObj.__handlers = resObj.__handlers.concat([{ name, handler, args }]);
      resObj.require = orgExt.require.bind(null, resObj);
      extensions.forEach(({ name: n2 }) => {
        resObj[n2] = orgExt[n2].bind(null, resObj);
      });
      return resObj;
    };
  }

  const typeChecker = {
    __typeChecker: validate,
    __handlers: [],
    __required: false,
  };
  orgExt.require = (resObj) => {
    resObj = Object.assign({}, resObj);
    resObj.__required = true;
    extensions.forEach(({ name }) => {
      resObj[name] = orgExt[name].bind(null, resObj);
    });
    return resObj;
  };
  typeChecker.require = orgExt.require.bind(null, typeChecker);

  extensions.forEach((ext) => {
    orgExt[ext.name] = extendFunction(ext);
    typeChecker[ext.name] = orgExt[ext.name].bind(null, typeChecker);
  });

  return typeChecker;
};


export const createPrimitiveTypeChecker = (expectedType, extensions) => {
  const validate = (key, value) => {
    const type = getType(value);
    if (type !== expectedType) {
      return genError(key, `Expected ${expectedType}, got ${type}`);
    }
    return null;
  };
  return createChainableTypeChecker(validate, extensions);
};
