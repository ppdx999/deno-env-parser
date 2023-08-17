# env-parser

.env parser written in deno

## Usage

```typescript
import {
  Env,
  parse,
} from "https://github.com/ppdx999/deno-env-parser/blob/main/mod.ts";

const source = `# this is a comment
str="value"
nospace=nospace

# a few blank lines

is_true=true
is_false=false
num=123
zero=0
str_start_zero=0123`;

const expected: Env = [
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

Deno.test("parser", () => {
  const actual = parse(source);
  assertEquals(actual, expected);
});
```
