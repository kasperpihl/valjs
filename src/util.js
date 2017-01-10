export const genError = (key, error) => {
  if (error) {
    const keyString = key ? ` key '${key}'` : '';
    return `Invalid${keyString}: ${error}`;
  }
  return null;
};
export const isValHandler = vH => (typeof vH === 'object' && vH.__rootChecker);


const isSymbol = (type, value) => {
  // Native Symbol.
  if (type === 'symbol') {
    return true;
  }

  // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
  if (value['@@toStringTag'] === 'Symbol') {
    return true;
  }

  // Fallback for non-spec compliant Symbols which are polyfilled.
  if (typeof Symbol === 'function' && value instanceof Symbol) {
    return true;
  }

  return false;
};

export const getType = (value) => {
  const type = typeof value;
  if (Array.isArray(value)) {
    return 'array';
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
