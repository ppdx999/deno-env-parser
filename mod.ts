export type KV = [string, string | boolean | number];
export type Comment = string;
export type Line = KV | Comment;
export type Env = Line[];

export const parseError = (line: string, row: number, msg: string) =>
  new Error(`Error parsing line ${row}: ${line}\n${msg}`);

const isNoQuote = (val: string) => !/['"]/.test(val);

const trimQuotes = (val: string) => {
  const head = val.charAt(0);
  const tail = val.charAt(val.length - 1);
  if (head === tail && (head === '"' || head === "'")) {
    return val.slice(1, -1);
  }
  return val;
};

const isNumber = (val: string) =>
  val === "0" || (/^\d+$/.test(val) && !val.startsWith("0"));

const isbool = (val: string) => {
  const lower = val.toLowerCase();
  return lower === "true" || lower === "false";
};

const toBool = (val: string) => val.toLowerCase() === "true";

export const isComment = (line: Line): line is Comment =>
  typeof line === "string";

export const isKV = (line: Line): line is KV => !isComment(line);

export const parse = (contents: string): Env =>
  contents.split(/\r?\n|\r/).map((line, i) => {
    const isComment = (line: Line): line is Comment =>
      typeof line === "string" &&
      (
        /^#/.test(line) ||
        line.trim() === ""
      );

    if (isComment(line)) {
      return line;
    }

    // Pull out key/values (value can have spaces, remove quotes)
    const kv = /^([^=]+)=(.*)$/.exec(line);

    if (!kv) {
      throw parseError(line, i, "Line must have an equal sign");
    }

    if (!kv[1]) {
      throw parseError(line, i, "Line must have a key");
    }

    if (!kv[2]) {
      throw parseError(line, i, "Line must have a value");
    }

    const key = kv[1].trim();
    const val = kv[2].trim();

    if (isNoQuote(val) && isNumber(val)) {
      return [key, parseInt(val)];
    }

    const tinyVal = trimQuotes(val);

    if (isbool(tinyVal)) {
      return [key, toBool(tinyVal)];
    }

    return [key, tinyVal];
  });

export const parseToRecord = (
  contents: string,
): Record<string, string | number | boolean> => {
  const env = parse(contents);

  return env.reduce((acc, line) => {
    if (isComment(line)) {
      return acc;
    }

    const [key, val] = line;

    return {
      ...acc,
      [key]: val,
    };
  }, {});
};
