## Basic usage
Validate string, two ways of running validator
```
import val, { string } from 'valjs';

let testString = 'hello'
let error = val(testString, string);
error = string.run(testString);
// passes! (null)
```
Or you can use promises
```
string.run(testString, {promise: true}).then(() => {
  // passed
}).catch((err) => {
  // failed with error
})
```

## Cheatsheet
```
import val, {
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

const error = val(passingObject, scheme);
// passes!
```

## Options
```
import val from 'valjs';
val.setGlobal('promise')
```
