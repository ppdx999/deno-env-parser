import { assertEquals } from "https://deno.land/std@0.198.0/assert/mod.ts";
import { Env, parse, parseKV } from "./mod.ts";

const source = `# this is a comment
str="value"
nospace=nospace

# a few blank lines

is_true=true
is_false=false
num=123
zero=0
str_start_zero=0123`;

Deno.test("parser", () => {
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

  const actual = parse(source);
  assertEquals(actual, expected);
});

Deno.test("parseKV", () => {
  const expected = {
    str: "value",
    nospace: "nospace",
    is_true: true,
    is_false: false,
    num: 123,
    zero: 0,
    str_start_zero: "0123",
  };

  const actual = parseKV(source);
  assertEquals(actual, expected);
});
