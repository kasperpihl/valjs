import {
  getType,
  getIterativeArray,
  isValHandler,
  genError,
  nestedKey,
  is,
  run,
} from '../util';

export function of(key, value, ...expected) {
  if(getType(expected[0]) === 'array' && typeof expected[1] === 'undefined'){
    expected = expected[0];
  }
  const iterator = getIterativeArray(value);
  const errors = iterator.map(([k, v]) => {
    const nKey = nestedKey(key, k);
    let nestedError;
    const passed = expected.find((ev) => {
      let err = this.nested(nKey, v, ev);
      if(err){
        if(err.error !== 'not matching'){
          nestedError = err;
        }
        return false;
      }
      return true;
    });
    if (typeof passed === 'undefined') {
      if(nestedError){
        return nestedError;
      }
      return genError(nKey, 'did not match of() values');
    }
    return null;
  }).filter(v => !!v);
  if(errors.length){
    return errors[0];
  }
  return null;
};

export function includes(key, value, expected) {
  const iterator = getIterativeArray(value);
  let nestedError;
  const passed = iterator.find(([k, v]) => {
    const nKey = nestedKey(key, k);
    let err = this.nested(nKey, v, expected);
    if(err){
      if(err.error !== 'not matching'){
        nestedError = err;
      }
      return false;
    }
    return true;
  });
  if (typeof passed === 'undefined') {
    if(nestedError){
      return nestedError;
    }
    return 'did not include expected value';
  }
  return null;

}

export function as(key, value, shape, strict) {
  if(getType(value) !== getType(shape)){
    return 'error in as(). expected ' + getType(shape) + '. got ' + getType(value);
  }
  const iterator = getIterativeArray(shape);
  const error = iterator.map(([k, ev]) => {
    const nKey = nestedKey(key, k);
    const shapeType = getType(shape);
    let v = value[k];
    if(typeof ev === 'undefined'){
      if(strict){
        return genError(nKey, `not allowed (strict mode)`);
      }
    }
    return this.nested(nKey, v, ev);
  }).filter(v => !!v)[0];
  return error || null;
};
