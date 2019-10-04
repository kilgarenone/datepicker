import pkg from "./package.json";
import { terser } from "rollup-plugin-terser";
import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import postcss from "rollup-plugin-postcss";
import common from "rollup-plugin-commonjs";

const plugins = [
  babel({
    exclude: "node_modules/**", // only transpile our source code
    comments: false
  }),
  resolve(),
  common(),
  postcss({
    extract: true
  }),
  terser()
];

export default [
  {
    input: "src/Datepicker.js",
    external: ["preact"],
    output: [
      {
        file: pkg.main,
        format: "cjs",
        sourcemap: true
      },
      {
        file: pkg.module,
        format: "esm",
        sourcemap: true
      },
      {
        file: pkg.umd,
        format: "umd",
        name: "DatePickerDate",
        sourcemap: true,
        globals: {
          preact: "preact"
        }
      }
    ],
    plugins
  },
  {
    input: "src/app.js",
    output: [
      {
        file: "src/app.min.js",
        format: "umd",
        name: "DatePickerDate",
        globals: {
          preact: "preact"
        }
      }
    ],
    plugins
  }
];
