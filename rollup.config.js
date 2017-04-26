const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');

export default {
  entry: 'radixtrie.js',
  format: 'cjs',
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    commonjs(),
    babel({ exclude: 'node_modules/**' })
  ],
  dest: 'dist/radixtrie.js'
};
