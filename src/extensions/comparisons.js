const getValue = (value) => {
  return value;
}
export const eq = {
  name: 'eq',
  handler: (key, value, expected) => {
    value = getValue(value);
    if (value !== expected) {
      return `Not equal '${expected}'`;
    }
    return null;
  },
};
export const neq = {
  name: 'neq',
  handler: (key, value, expected) => {
    value = getValue(value);
    if (value === expected) {
      return `Equal '${expected}'`;
    }
    return null;
  },
};

export const gt = {
  name: 'gt',
  handler: (key, value, expected) => {
    value = getValue(value);
    if (value <= expected) {
      return `Not greater than '${expected}'`;
    }
    return null;
  },
};

export const gte = {
  name: 'gte',
  handler: (key, value, expected) => {
    value = getValue(value);
    if (value < expected) {
      return `Not greater than equal '${expected}'`;
    }
    return null;
  },
};

export const lt = {
  name: 'lt',
  handler: (key, value, expected) => {
    value = getValue(value);
    if (value >= expected) {
      return `Not less than '${expected}'`;
    }
    return null;
  },
};

export const lte = {
  name: 'lte',
  handler: (key, value, expected) => {
    value = getValue(value);
    if (value > expected) {
      return `Not less than equal '${expected}'`;
    }
    return null;
  },
};
