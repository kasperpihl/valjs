import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify'
import replace from 'rollup-plugin-replace'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs';
import { minify } from 'uglify-es';

const prod = process.env.NODE_ENV === 'production';
const umd = process.env.BABEL_ENV === 'umd';

const config = {
  input: './src/index',
  name: 'valjs',
  plugins: [
    babel({
      exclude: ['node_modules/**'],
      runtimeHelpers: umd
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(prod ? 'production' : 'development'),
    }),
    resolve(),
    commonjs(),
    prod && uglify({}, minify)
  ]
};

export default config;