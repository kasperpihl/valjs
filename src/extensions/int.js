// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger
Number.isInteger = Number.isInteger || function(value) {
  return typeof value === "number" &&
          isFinite(value) &&
          Math.floor(value) === value;
};

export default {
  int: (key, value) => {
    if (!Number.isInteger(value)) {
      return `${value} is not an integer`;
    }

    return null;
  },
};
