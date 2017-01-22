```
import { object } from 'valjs';
```
## Defaults
```
object.test({}) // standard tester
object.require().test('hello') // require to be set
object.custom((value) => { return null }) // custom handler, return string if error
```
## Iteratives
```
object.of(1, 2, 3).test({one: 1, two: 2}) // An object with values of either 1, 2 or 3
object.of([1, 2, 3]).test({one: 1, two: 2}) // Same as above but with array as arg.
```
## Bounds
```
object.max(2).test({ one: 1, two: 2 }) // max size
object.min(2).test({ one: 1, two: 2 }) // min size
object.empty().test({}) // empty object
```
