```
import val, { string } from 'val-js';

const schema = {
  foo: string,
  bar: string.min(6).require(),
};

const obj = {
  foo: 'test',
  bar: 'world',
}

console.log(val(obj, schema));
// 'bar' invalid: Too short. Min length 6. Got 5
```
