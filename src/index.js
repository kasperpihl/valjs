import 'core-js/fn/object/entries';
// Validator essentials
import ValHandler from './val-handler';
import val from './val';

// Import Extensions
// eq, neq, gt, gte, lt, lte
import * as comp from './extensions/comparisons';
// of, as, includes
import * as iteratives from './extensions/iteratives';
// min, max, empty
import * as bounds from './extensions/bounds';
import format from './extensions/format';
import int from './extensions/int';

export const string = ValHandler('string', [comp, format, bounds]);
export const number = ValHandler('number', [comp, format, int]);
export const bool = ValHandler('bool', [{ eq: comp.eq, neq: comp.neq}]);
export const date = ValHandler('date');
export const func = ValHandler('func');
export const array = ValHandler('array', [iteratives, bounds]);
export const object = ValHandler('object', [iteratives, bounds]);
export const any = ValHandler(undefined, [{ of: iteratives.of}]);

// Helpers for react folks.
export const objectOf = () => console.warn('objectOf() not supported. Use: object.of()');
export const shape = () => console.warn('shape() not supported. Use object.as() or array.as()');
export const oneOf = () => console.warn('oneOf() not supported. Use any.of()');
export const oneOfType = () => console.warn('oneOfType() not supported. Use any.of()');
export const arrayOf = () => console.warn('arrayOf() not supported. Use array.of()');

export default val;

export const funcWrap = (valHandlers, callback) => {
  const wrapError = array.as([
    array.require(),
    func.require()
  ]).test([valHandlers, callback]);
  if(wrapError){
    console.warn('funcWrap wrongly used: ', wrapError)
    return () => {};
  }
  const wrap = function() {
    const args = [...arguments];
    const argsErr = array.as(valHandlers).test(args);

    return callback(argsErr, ...args);
  }
  wrap.schema = function() {
    console.log(array.as(valHandlers).toString());
  }
  return wrap;
}
