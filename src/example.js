import 'babel-polyfill';
import val, { string, shape, objectOf } from './index';
val.setGlobal('log', true);
objectOf(string).run({test: 9});
