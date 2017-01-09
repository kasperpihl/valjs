export default {
  name: 'max',
  handler: (value, max) => {
    if (typeof max !== 'number') {
      return 'Invalid notation in max. Expected number';
    }
    if (value > max) {
      return `Too big. Expected max ${max}. Got ${value}`;
    }
    return null;
  },
};
