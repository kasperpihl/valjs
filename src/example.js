import 'babel-polyfill';
import val, { string, number, array, object, any, date } from './index';
val.setGlobal('log', true);

date.require().test();


object.as({
  two: string
}).test({
  two: 9
});
array.includes(object.of({
  two: string.require()
})).test([
  1,
  {
    one: {
      two: 9
    }
  }
]);
