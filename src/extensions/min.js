export default {
  name: 'min',
  handler: (value, min) => {
    if (typeof min !== 'number') {
      return 'Invalid notation in min. Expected number';
    }
    if (value < min) {
      return `Too short. Expected min ${min}. Got ${value}`;
    }
    return null;
  },
};
