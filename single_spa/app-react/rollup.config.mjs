import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'pages.jsx',
  context: 'window',
  output: {
    file: 'pages.min.js',
    format: 'esm',
    sourcemap: true,
  },
  external: ['react', 'react-dom', 'single-spa-react'],
  plugins: [
    resolve({ extensions: ['.js', '.jsx'] }),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      exclude: "node_modules/**",
      presets: ["@babel/env", "@babel/preset-react"]
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
      preventAssignment: true
    }),
    terser({
      keep_fnames: true,
      mangle: {
        reserved: ["React", "ReactDOM", "singleSpaReact"]
      }
    })
  ],
};
