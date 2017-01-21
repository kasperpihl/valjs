import {
  run,
} from '../validator';
import {
  getType,
  getIterativeArray,
  isValHandler,
  genError,
  nestedKey,
  is,
} from '../util';

export const of = (key, value, ...expected) => {
  if(getType(expected[0]) === 'array' && typeof expected[1] === 'undefined'){
    expected = expected[0];
  }
  const iterator = getIterativeArray(value);
  const errors = iterator.map(([k, v]) => {
    const nKey = nestedKey(key, k);
    let nestedError;
    const passed = expected.find((ev) => {
      if (isValHandler(ev)) {
        nestedError = run(ev, nKey, v);
        if (!nestedError) {
          return true;
        }
      } else if (is(ev, v)) {
        return true;
      }
      return false;
    });
    if (typeof passed === 'undefined') {
      if(nestedError){
        return nestedError;
      }
      return genError(nKey, 'did not match values');
    }
    return null;
  }).filter(v => !!v);
  if(errors.length){
    return errors[0];
  }
  return null;
};

export const as = (key, value, shape, strict) => {
  if(getType(value) !== getType(shape)){
    return 'error in as(). expected ' + getType(shape) + '. got ' + getType(value);
  }
  const iterator = getIterativeArray(shape);
  const errors = iterator.map(([k, ev]) => {
    const nKey = nestedKey(key, k);
    const shapeType = getType(shape);
    let v = value[k];
    if(typeof ev === 'undefined'){
      if(strict){
        return genError(nKey, `not allowed (strict mode)`);
      }
    }
    else if (isValHandler(ev)) {
      return run(ev, nKey, v);
    } else if (!is(ev, v)) {
      return genError(nKey, `not matching expected value`);
    }
    return null;
  }).filter(v => !!v);
  if(errors.length){
    return errors[0];
  }
  return null;
};
