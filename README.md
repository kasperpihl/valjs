## Installation
```
npm install --save valjs
```

## Simple example
Let's validate if a string is minimum 5 chars.
```javascript
import { string } from 'valjs';

let error = string.min(5).test('hello')
// passes! (null)
```

## Badass example
Let's validate this
```javascript
const todo = {
  id: 'todo-1',
  title: 'Ship Login Page',
  updatedAt: '2017-01-21T22:54:45Z',
  state: 'completed',
  assignees: [
    'user-1'
  ],
  subtasks: [
    { title: 'Design' },
    { title: 'Develop' },
    { title: 'QA' }
  ]
}
```
Like this
```javascript
import { object, string, array, any } from 'valjs';

const error = object.as({
  id: string.require(),
  title: string.require().min(1).max(255),
  updatedAt: string.format('iso8601'),
  state: any.of('active', 'completed'),
  assignees: array.require().of(string.min(6).startsWith('user-')),
  subtasks: array.of(object.as({
    title: string.require().min(1).max(60)
  }))
}).test(todo);
// passes!
```

## Here are all the supported types
```javascript
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
```
[string API](https://github.com/swipesapp/valjs/blob/master/docs/string.md)

[number API](https://github.com/swipesapp/valjs/blob/master/docs/number.md)

[bool API](https://github.com/swipesapp/valjs/blob/master/docs/bool.md)

[func API](https://github.com/swipesapp/valjs/blob/master/docs/func.md)

[object API](https://github.com/swipesapp/valjs/blob/master/docs/object.md)

[array API](https://github.com/swipesapp/valjs/blob/master/docs/array.md)

[date API](https://github.com/swipesapp/valjs/blob/master/docs/date.md)

[any API](https://github.com/swipesapp/valjs/blob/master/docs/any.md)
