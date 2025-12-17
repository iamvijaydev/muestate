import peerDepsExternal from "rollup-plugin-peer-deps-external";
import terser from '@rollup/plugin-terser';
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";

export default {
  input: {
    index: "src/index.ts",
    utils: "src/utils.ts",
    "mutableStore/createStore": "src/mutableStore/createStore.tsx",
    "reactiveStore/createStore": "src/reactiveStore/createStore.tsx",
    "utils/useDefinedContext": "src/utils/useDefinedContext.ts",
    "utils/useMutableState": "src/mutableStore/utils/useMutableState.ts",
    "utils/useMutableSubscription": "src/mutableStore/utils/useMutableSubscription.ts",
    "utils/useReactiveState": "src/mutableStore/utils/useReactiveState.ts",
  },
  output: [
    {
      dir: "dist/esm",
      format: "esm",
      sourcemap: false,
      preserveModules: true,
      preserveModulesRoot: "src",
    },
    {
      dir: "dist/cjs",
      format: "cjs",
      sourcemap: false,
      preserveModules: true,
      preserveModulesRoot: "src",
    }
  ],
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
