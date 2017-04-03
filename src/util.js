export const genError = (key, error) => {
  if(typeof key === 'string' && typeof error === 'string'){
    return {
      key,
      error
    };
  }
};
export const nestedKey = (key, k) => {
  if(typeof k === 'string' && k.length){
    return `${key}['${k}']`;
  }
  if(typeof k === 'number'){
    return `${key}[${k}]`;
  }
  return key;
}
export const isValHandler = vH => (typeof vH === 'object' && vH.__typeChecker);

// ======================================================
// Helper function to run down the tree.
// Used for recursive handling of types.
// ======================================================

export const run = (valHandler, key, value, overrideValHandler) => {
  if(typeof overrideValHandler !== 'undefined'){
    valHandler = overrideValHandler;
  }
  let error = null;
  if (isValHandler(valHandler)) {
    valHandler.__chain.forEach(({
      handler,
      args,
    }) => {
      if(!valHandler.__stop && !error){
        error = handler.bind(valHandler)(key, value, ...args);
      }
    });
    valHandler.__stop = false;
  } else {
    if(!is(valHandler, value)){
      error = genError(key, 'not matching');
    }
  }
  if(typeof error === 'string'){
    error = genError(key, error);
  }
  return error || null;
};


export const getIterativeArray = (value) => {
  const type = getType(value);
  if(type === 'object'){
    return Object.entries(value);
  }
  if(type === 'array'){
    return value.map((v, i) => [i, v]);
  }
  return [['', value]];
}

const isSymbol = (type, value) => {
  // Native Symbol.
  if (type === 'symbol') {
    return true;
  }

  // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
  if (value && value['@@toStringTag'] === 'Symbol') {
    return true;
  }

  // Fallback for non-spec compliant Symbols which are polyfilled.
  if (typeof Symbol === 'function' && value instanceof Symbol) {
    return true;
  }

  return false;
};

export const isValidDate = (date) => (date instanceof Date && !isNaN(date.valueOf()));
export const isInvalidDate = (date) => (date instanceof Date && isNaN(date.valueOf()))

export const getType = (value) => {
  const type = typeof value;
  if (Array.isArray(value)) {
    return 'array';
  }
  if(typeof value === 'boolean'){
    return 'bool';
  }
  if(typeof value === 'function'){
    return 'func';
  }
  if (value instanceof RegExp) {
    // Old webkits (at least until Android 4.0) return 'function' rather than
    // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
    // passes PropTypes.object.
    return 'object';
  }
  if (isSymbol(type, value)) {
    return 'symbol';
  }
  if(isValidDate(value)){
    return 'date';
  }
  if(isInvalidDate(value)){
    return 'invalid-date';
  }
  return type;
};


export const is = (x, y) => {
  // SameValue algorithm
  if (x === y) { // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    return x !== 0 || 1 / x === 1 / y;
  }
  // Step 6.a: NaN == NaN
  return x !== x && y !== y;
};

export const indentString = (str, count, indent) => {
  indent = indent === undefined ? ' ' : indent;
  count = count === undefined ? 1 : count;

  if (typeof str !== 'string') {
    throw new TypeError(`Expected \`input\` to be a \`string\`, got \`${typeof str}\``);
  }

  if (typeof count !== 'number') {
    throw new TypeError(`Expected \`count\` to be a \`number\`, got \`${typeof count}\``);
  }

  if (typeof indent !== 'string') {
    throw new TypeError(`Expected \`indent\` to be a \`string\`, got \`${typeof indent}\``);
  }

  if (count === 0) {
    return str;
  }

  return str.replace(/^(?!\s*$)/mg, indent.repeat(count));
};
