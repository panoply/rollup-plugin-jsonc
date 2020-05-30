import buble from '@rollup/plugin-buble';
import { terser } from 'rollup-plugin-terser'

const pkg = require('./package.json');

const external = Object.keys(pkg.dependencies);

export default {
  input: 'index.js',
  output: [
    { file: pkg.main, format: 'cjs', sourcemap: !process.env.prod },
    { file: pkg.module, format: 'es', sourcemap: !process.env.prod  }
  ],
  plugins: [terser(),buble()],
  external
};
