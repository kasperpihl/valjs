## Installation
```
npm install --save valjs
```

## Simple example
Let's validate if a string is minimum 5 chars.
```
import { string } from 'valjs';

let error = string.min(5).test('hello')
// passes! (null)
```

## Badass example
Let's validate this
```
const todo = {
  id: 'todo-1',
  title: 'Ship Login Page',
  completionDate: '2017-01-21T22:54:45Z',
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
```
const error = object.as({
  id: string.require(),
  title: string.require().min(1).max(255),
  completionDate: string.format('iso8601'),
  assignees: array.require().of(string.min(6).startsWith('user-')),
  subtasks: array.of(object.as({
    title: string.require().min(1).max(60)
  }))
}).test(todo);
// passes!
```

## Here are all the supported
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
```
