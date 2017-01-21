import {
  getType,
} from '../util';

const getSize = (value) => {
  const type = getType(value);
  if(['array', 'string'].indexOf(type) !== -1){
    return value.length;
  }
  if(type === 'object'){
    return Object.entries(value).length;
  }
}

export const max = (key, value, maxValue) => {
  if (typeof max !== 'number') {
    return 'invalid notation in max. expected number';
  }
  const size = getSize(value);
  if (size > maxValue) {
    return `max size ${maxValue}. got ${size}`;
  }
  return null;
};
export const min = (key, value, min) => {
  if (typeof minValue !== 'number') {
    return 'invalid notation in min. expected number';
  }
  const size = getSize(value);
  if (size < minValue) {
    return `min size ${minValue}. got ${size}`;
  }
  return null;
};

export const empty = (key, value) => {
  const size = getSize(value);
  console.log(size);
  if(size > 0){
    return 'not empty';
  }
  return null;
}
