```
import { bool } from 'valjs';
```
## Defaults
```
number.require().test(true) // require to be set
number.custom((value) => { return null }) // custom handler
```
## Comparisons
```
number.eq(true).test(true) // equal
number.neq(true).test(false) // not equal
```
