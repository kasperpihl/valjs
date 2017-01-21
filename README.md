## Basic usage
Get started
```
npm install --save valjs;
```
Run your validations
```
import { string } from 'valjs';

let error = string.test('hello')
// passes!
error = string.format('email').test('support@swipesapp.com')
// passes!
```

PS. see below for skipping the { promise: true } options with setGlobal

## Cheatsheet
```
import valjs, {
  string,
  number,
  bool,
  func,
  object,
  array,
  date,
  any
} from 'valjs';

const scheme = object.as({
  one: string.require(), // make required!
  two: number.min(6).require(), // set min number to six and require
  three: bool,
  four: func,
  five: object,
  six: object.as({
    half: bool,
  }),
  seven: array.of(string),
  eigth: object.of(string),
  nine: any.of(1337),
});

const passingObject = {
  one: 'hello',
  two: 9,
  three: true,
  four: () => null,
  five: {},
  six: {
    half: true,
  },
  seven: ['test', 'hello'],
  eight: {
    half: 'hello'
  },
  nine: 1337,
}

const error = valjs(passingObject, scheme);
// passes!
```

## Options
All options can also be passed as an object in the third parameter of valjs function.
Here it is shown how to set them globally.

Log out errors (useful for debugging, shouldn't be used in production)
```
valjs.setGlobal('log', true);
```
Make promises the default way for valjs.
```
valjs.setGlobal('promise', true) // make promises default way
```
Change condition for when to run (great if you don't want to validate in production fx)
```
valjs.setGlobal('runCondition', () => (env !== 'dev'))
```
