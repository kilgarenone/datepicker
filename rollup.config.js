import pkg from './package.json'
import { terser } from 'rollup-plugin-terser'
import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import postcss from 'rollup-plugin-postcss'

const plugins = [
  babel({
    exclude: 'node_modules/**', // only transpile our source code
    comments: false
  }),
  resolve(),
  postcss({
    extract: true
  }),
  terser()
]

export default [
  {
    input: 'src/Datepicker.js',
    external: ['preact'],
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        globals: {
          preact: 'preact'
        },
        sourcemap: true
      },
      {
        file: pkg.browser,
        format: 'umd',
        name: 'DatePickerDate',
        globals: {
          preact: 'preact'
        }
      },
      {
        file: pkg.module,
        format: 'esm',
        globals: {
          preact: 'preact'
        },
        sourcemap: true
      }
    ],
    plugins
  },
  {
    input: 'src/app.js',
    output: [
      {
        file: 'src/app.min.js',
        format: 'umd',
        name: 'DatePickerDate',
        globals: {
          preact: 'preact'
        }
      }
    ],
    plugins
  }
]
