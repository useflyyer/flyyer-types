/* eslint-disable @typescript-eslint/no-var-requires */
import dts from "rollup-plugin-dts";
import esbuild from "rollup-plugin-esbuild";

const name = require("./package.json").main.replace(/\.js$/, "");

const ext = (format) => (format == "dts" ? "d.ts" : format == "cjs" ? "js" : "mjs");

/**
 * @see https://gist.github.com/aleclarson/9900ed2a9a3119d865286b218e14d226
 */
const bundle = (format) => ({
  input: "src/index.ts",
  output: {
    file: `${name}.${ext(format)}`,
    format: format == "cjs" ? "cjs" : "es",
    sourcemap: format != "dts",
  },
  plugins: format == "dts" ? [dts()] : [esbuild()],
  external: (id) => !/^[./]/.test(id),
});

export default [
  bundle("es"), //
  bundle("cjs"),
  bundle("dts"),
];
