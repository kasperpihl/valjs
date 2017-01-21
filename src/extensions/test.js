export default {
  name: 'test',
  handler: (key, value, callback) => {
    if (typeof callback !== 'function') {
      return 'Invalid notation in test. Expected function';
    }
    return callback(value);
  },
};
