import val, { bool, string, number, array, object, any, date, func, funcWrap } from './index';

string.min(1).max(255).toString();

const res = array.as([
  string.require().min(1, 2, [
    'test',
    'two'
  ]),
  object.as({
    hello: string,
    world: object.of(string).require(),
    lala: any.of([
      'test',
      string.min(1)
    ])
  }),
  number,
  array.as([
    array.as([
      string,
    ])
  ])
]).toString();
console.log(res);
/*object.as({
  test: string.min(1).format('email'),
  hello: object.of(string).require(),
  world: array.min(1).require(),
}).toString();
*/
