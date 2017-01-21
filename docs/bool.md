```
import { bool } from 'valjs';
```
## Defaults
```
bool.test(true) // standard tester
bool.require().test(true) // require to be set
bool.custom((value) => { return null }) // custom handler
```
## Comparisons
```
bool.eq(true).test(true) // equal
bool.neq(true).test(false) // not equal
```
