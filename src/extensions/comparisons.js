const getValue = (value) => {
  return value;
}
export const eq = (key, value, expected) => {
  value = getValue(value);
  if (value !== expected) {
    return `expected not equal '${expected}'`;
  }
  return null;
};
export const neq = (key, value, expected) => {
  value = getValue(value);
  if (value === expected) {
    return `expected equal '${expected}'`;
  }
  return null;
};

export const gt = (key, value, expected) => {
  value = getValue(value);
  if (value <= expected) {
    return `expected greater than '${expected}'`;
  }
  return null;
};

export const gte = (key, value, expected) => {
  value = getValue(value);
  if (value < expected) {
    return `expected greater than equal '${expected}'`;
  }
  return null;
};

export const lt = (key, value, expected) => {
  value = getValue(value);
  if (value >= expected) {
    return `expected less than '${expected}'`;
  }
  return null;
};

export const lte = (key, value, expected) => {
  value = getValue(value);
  if (value > expected) {
    return `expected less than equal '${expected}'`;
  }
  return null;
};
