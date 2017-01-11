## Basic usage
Get started
```
npm install --save valjs;
```
Run your validations
```
import valjs, { string } from 'valjs';

let error = valjs('hello', string);
// passes! (null)
```
Or you can use promises
```
valjs('hello', string, {promise: true}).then(() => {
  // passed
}).catch((err) => {
  // failed with error
})
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
  shape,
  arrayOf,
  objectOf,
  oneOf,
  custom,
} from 'valjs';

const scheme = shape({
  one: string.require(), // make required!
  two: number.min(6).require(), // set min number to six and require
  three: bool,
  four: func,
  five: object,
  six: shape({
    half: bool,
  }),
  seven: arrayOf(string),
  eigth: objectOf(string),
  nine: oneOf([1337]),
  ten: (v) => (v === 'swipes' ? null : 'not swipes'),
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
  ten: 'swipes',
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
