```
import { number } from 'valjs';
```
## Defaults
```
number.require().test(9) // require to be set
number.custom((value) => { return null }) // custom handler
```
## Comparisons
```
number.eq(3).test(3) // equal
number.neq(3).test(9) // not equal
number.gt(3).test(9) // greater than
number.gte(3).test(3) // greater than equal
number.lt(9).test(3) // less than
number.lte(3).test(3) // less than equal
```

## Format
```
number.format(/was/i).test('was'); regex
```
