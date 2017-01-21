import 'babel-polyfill';
import val, { string, number, array, shape, objectOf, object } from './index';
val.setGlobal('log', true);
string.eq('test').run('test2');
val({
  one: 'http://google.com',
  two: 'kasper@pihl.it'
}, shape({
  one: string.neq('kasper@'),
  two: string.format('email'),
}))
val({
  one: 'hello'
}, object.of(number, 'test'));

val([
  'hello'
], array.of('hell', string));
