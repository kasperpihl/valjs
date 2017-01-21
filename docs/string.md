```
import { string } from 'valjs';
```
## Defaults
```
string.require().test('hello') // require to be set
string.custom((value) => { return null }) // custom handler
```
## Comparisons
```
string.eq('hello').test('hello') // equal
string.neq('hello').test('world') // not equal
string.gt('a').test('b') // greater than
string.gte('ab').test('ab') // greater than equal
string.lt('b').test('a') // less than
string.lte('ab').test('ab') // less than equal
```
## Bounds
```
string.max(5).test('hello') // max length
string.min(5).test('world') // min length
string.empty().test('') // empty string
```

## Format
```
string.format(/was/i).test('was'); regex
// Out-of-the-box formats
string.format('email').test('support@swipesapp.com') // email checker
string.format('url').test('https://google.com') // url checker
string.format('iso8601').test('2017-01-21T22:54:45Z') // iso8601 checker
```
