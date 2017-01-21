```
import { date } from 'valjs';
```
## Defaults
```
date.test(new Date()) // standard tester
date.require().test(new Date()) // require to be set
date.custom((value) => { return null }) // custom handler, return string if error
```
