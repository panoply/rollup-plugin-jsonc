
# rollup-plugin-jsonc

[Rollup](https://rollupjs.org) plugin to support JSON and JSONC (json with comments) file types.

## Why?

Because the rollup hall monitor said [no](https://github.com/rollup/plugins/issues/44) :trollface:

## Install

```cli
<pnpm|npm|yarn> i rollup-plugin-jsonc --save-dev
```

## Usage

```js
import jsonc from "rollup-plugin-jsonc";

export default {
  input: "src/index.js",
  output: {
    dir: "output",
    format: "cjs",
  },
  plugins: [
    jsonc(),
  ],
};
```

## License

[WTFPL](#LICENSE)
