import 'babel-polyfill';
import val, { string, number, array, object, any, date } from './index';
val.setGlobal('log', true);

array.require().test();
array.as([
  any.of(1, 2, 3),
  object.empty().of(array),
], true).test([
  1,
  {
    one: {
      two: 9
    }
  }
]);
