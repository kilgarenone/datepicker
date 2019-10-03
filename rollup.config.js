import pkg from "./package.json";
import { terser } from "rollup-plugin-terser";
import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import postcss from "rollup-plugin-postcss";

export default [
  {
    input: "src/Datepicker.js",
    external: ["preact"],
    output: [
      {
        file: pkg.main,
        format: "cjs",
        globals: {
          preact: "preact"
        }
      },
      {
        file: pkg.browser,
        format: "umd",
        name: "DatePickerDate",
        globals: {
          preact: "preact"
        }
      },
      {
        file: pkg.module,
        format: "es",
        globals: {
          preact: "preact"
        }
      }
    ],
    plugins: [
      babel({
        exclude: "node_modules/**" // only transpile our source code
      }),
      resolve(),
      postcss({
        extract: true
      }),
      terser()
    ]
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
    plugins: [
      babel({
        exclude: "node_modules/**" // only transpile our source code
      }),
      resolve(),
      postcss({
        extract: true
      }),
      terser()
    ]
  }
];
