const getValue = (value) => {
  return value;
}
export const eq = (key, value, expected) => {
  value = getValue(value);
  if (value !== expected) {
    return `Not equal '${expected}'`;
  }
  return null;
};
export const neq = (key, value, expected) => {
  value = getValue(value);
  if (value === expected) {
    return `Equal '${expected}'`;
  }
  return null;
};

export const gt = (key, value, expected) => {
  value = getValue(value);
  if (value <= expected) {
    return `Not greater than '${expected}'`;
  }
  return null;
};

export const gte = (key, value, expected) => {
  value = getValue(value);
  if (value < expected) {
    return `Not greater than equal '${expected}'`;
  }
  return null;
};

export const lt = (key, value, expected) => {
  value = getValue(value);
  if (value >= expected) {
    return `Not less than '${expected}'`;
  }
  return null;
};

export const lte = (key, value, expected) => {
  value = getValue(value);
  if (value > expected) {
    return `Not less than equal '${expected}'`;
  }
  return null;
};
