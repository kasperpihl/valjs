export const custom = (key, value, handler) => {
  if(typeof handler !== 'function'){
    return 'expected function as parameter to custom';
  }
  return handler(value);
};
