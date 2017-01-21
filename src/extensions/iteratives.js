import {
  run,
} from '../validator';
import {
  getType,
  isValHandler,
  genError,
  is,
} from '../util';

const getIterativeArray = (value) => {
  const type = getType(value);
  if(type === 'object'){
    return Object.entries(value);
    console.log('got object!');
  }
  if(type === 'array'){
    return value.map((v, i) => [i, v]);
  }
  return value;
}
export const of = {
  name: 'of',
  handler: (key, value, ...expected) => {
    const iterator = getIterativeArray(value);
    const errors = iterator.map(([k, v]) => {
      const passed = expected.find((ev) => {
        if (isValHandler(ev)) {
          if (!run(ev, k, v)) {
            return true;
          }
        } else if (is(ev, v)) {
          return true;
        }
        return false;
      });
      if (!passed) {
        console.log(k);
        return genError(''+k, 'did not match of values');
      }
      return null;
    }).filter(v => !!v);
    if(errors.length){
      return errors[0];
    }
    return null;
  },
};
