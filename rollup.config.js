import pkg from "./package.json";
import { terser } from "rollup-plugin-terser";
import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import postcss from "rollup-plugin-postcss";
import filesize from "rollup-plugin-filesize";

const plugins = [
  babel({
    exclude: "node_modules/**"
  }),
  resolve(),
  postcss({
    extract: true,
    minimize: true,
    sourceMap: true
  }),
  terser(),
  filesize()
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
    input: "src/demo/app.js",
    output: [
      {
        file: "src/demo/app.min.js",
        format: "umd",
        name: "DatePickerDate",
        sourcemap: true,
        globals: {
          preact: "preact"
        }
      }
    ],
    plugins
  }
];
