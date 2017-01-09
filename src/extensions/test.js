export default {
  name: 'test',
  handler: (value, callback) => {
    if (typeof callback !== 'function') {
      return 'Invalid notation in test. Expected function';
    }
    return callback(value);
  },
};
