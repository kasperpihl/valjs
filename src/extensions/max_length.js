export default {
  name: 'max',
  handler: (value, max) => {
    if (typeof max !== 'number') {
      return 'Invalid notation in max. Expected number';
    }
    if (value.length > max) {
      return `Too long. Max length ${max}. Got ${value.length}`;
    }
    return null;
  },
};
