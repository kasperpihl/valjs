import 'babel-polyfill';
import val, { bool, string, number, array, object, any, date, func } from './index';
val.setGlobal('log', true);

bool.require().test(false);

any.require().test();
console.log('test1');
const testObj = {
  schema: {},
  middleware: null
};
const error = object.as({
  schema: object.require(),
  middleware: func,
}).test(testObj);
