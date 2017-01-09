export default {
  name: 'min',
  handler: (value, min) => {
    if (typeof min !== 'number') {
      return 'Invalid notation in min. Expected number';
    }
    if (value.length < min) {
      return `Too short. Min length ${min}. Got ${value.length}`;
    }
    return null;
  },
};
