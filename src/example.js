import 'babel-polyfill';
import val, { string, number, array, shape, objectOf } from './index';
val.setGlobal('log', true);
string.eq('test').run('test2');
val({
  one: 'http://google.com',
  two: 'kasper@pihl.it23232'
}, shape({
  one: string.neq('kasper@'),
  two: string.format('email'),
}))
