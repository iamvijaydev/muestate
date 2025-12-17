import peerDepsExternal from "rollup-plugin-peer-deps-external";
import terser from '@rollup/plugin-terser';
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/index.ts",
  output: {
    dir: "dist/umd",
    format: "umd",
    name: "muestate",
    sourcemap: false,
    globals: {
      react: "React"
    }
  },
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.json",
      declaration: false,
    }),
    terser()
  ],
};
