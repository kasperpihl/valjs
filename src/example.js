import val, { bool, string, number, array, object, any, date, func, funcWrap } from './index';

const lala = string.format(/^[A-Za-z0-9]+$/g).min(6).max(6).require();


let scheme = string.require();

console.log('tested "hi":', scheme.test('hi'));
console.log('tested null:', scheme.test(null));
scheme = scheme.acceptNull();
console.log('tested null w/ acceptNull:', scheme.test(null));

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
// console.log(res);

const wrappy = funcWrap([
  string,
  any.of('hello', object.as({
    test: string,
  }))
], (valErr, val1, val2) => {

});

// wrappy.schema();
/*object.as({
  test: string.min(1).format('email'),
  hello: object.of(string).require(),
  world: array.min(1).require(),
}).toString();
*/
