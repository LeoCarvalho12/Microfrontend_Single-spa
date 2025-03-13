import alias from "@rollup/plugin-alias";
import path from "path";
import replace from "@rollup/plugin-replace";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { string } from "rollup-plugin-string";
import { terser } from "rollup-plugin-terser";
const __dirname = process.cwd();
export default {
  input: "src/main.single-spa.ts",
  output: { file: "dist/pages.min.js", format: "esm", sourcemap: true },
  plugins: [
    alias({
      entries: [
        {
          find: "asset-url",
          replacement: path.resolve(
            __dirname,
            "single_spa/app-angular/src/single-spa/asset-url.ts"
          ),
        },
      ],
    }),
    resolve(),
    commonjs(),
    typescript(),
    string({ include: ["src/**/*.html", "src/**/*.scss", "src/**/*.css"] }),
    replace({
      "process.env.NODE_ENV": JSON.stringify("production"),
      preventAssignment: true,
    }),
    terser({ keep_fnames: true }),
  ],
  external: [],
};
