```
import { any } from 'valjs';
```

## Defaults
```
any.test(9) // standard tester
any.require().test(9) // require to be set
any.custom((value) => { return null }) // custom handler, return string if error
```

## Iteratives
```
any.of([3, 9, 19]).test(9) // one of values (array)
any.of(3, 9, 19).test(9) // one of values (arguments)
any.of(string, number).test('9') // either a string or number.
any.of(string.eq('9'), number.eq(9)).test(9) // either the string or number 19
```
