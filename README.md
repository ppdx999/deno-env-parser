# env-parser

.env parser written in deno

## Usage

```sh
$ cat .env
# this is a comment
str="value"
nospace=nospace

# a few blank lines

is_true=true
is_false=false
num=123
zero=0
str_start_zero=0123
```

```typescript
import { parse } from "https://raw.githubusercontent.com/ppdx999/deno-env-parser/main/mod.ts";
/*
if you use node, run `npm i env-files-parser` and import like below

import { parse } from "env-files-parser";

*/

// somehow read string data from .env file
const env: string = readFile('env')

const result = [
  "# this is a comment",
  ["str", "value"],
  ["nospace", "nospace"],
  "",
  "# a few blank lines",
  "",
  ["is_true", true],
  ["is_false", false],
  ["num", 123],
  ["zero", 0],
  ["str_start_zero", "0123"],
];

result == parser(env) // --> true
```
