# env-parser

.env parser written in deno

## Usage

```typescript
import { assertEquals } from "https://deno.land/std@0.198.0/assert/mod.ts";
import {
  Env,
  parse,
} from "https://raw.githubusercontent.com/ppdx999/deno-env-parser/main/mod.ts";

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
