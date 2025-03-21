import vue from "@vitejs/plugin-vue";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import nodeResolve from "@rollup/plugin-node-resolve";
import alias from "@rollup/plugin-alias";
import postcss from "rollup-plugin-postcss";

export default {
  input: "pages.js",
  output: {
    file: "pages.min.js",
    format: "esm",
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    vue(),
    postcss(),
    alias({
      entries: {
        vue: require.resolve("vue/dist/vue.esm-bundler.js"),
      },
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify("development"),
      "__VUE_OPTIONS_API__": JSON.stringify(true),
      "__VUE_PROD_DEVTOOLS__": JSON.stringify(false),
      "__VUE_PROD_HYDRATION_MISMATCH_DETAILS__": JSON.stringify(false),
      preventAssignment: true,
    }),
  ],
};
