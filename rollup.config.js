const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');

export default {
  entry: 'radixtrie.js',
  format: 'cjs',
  plugins: [
    resolve(),
    babel({ exclude: 'node_modules/**' })
  ],
  dest: 'dist/radixtrie.js'
};
