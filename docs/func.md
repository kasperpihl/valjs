```
import { func } from 'valjs';
```
## Defaults
```
func.test(function() {}) // standard tester
func.require().test(function() {}) // require to be set
func.custom((value) => { return null }) // custom handler, return string if error
```
