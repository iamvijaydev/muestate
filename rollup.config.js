import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";

export default {
  input: {
    index: "src/index.ts",
    "utils/useDefinedContext": "src/utils/useDefinedContext.ts",
    "utils/useMutableState": "src/utils/useMutableState.ts",
    "utils/useMutableSubscription": "src/utils/useMutableSubscription.ts",
    "utils/useReactiveState": "src/utils/useReactiveState.ts",
  },
  output: [
    {
      dir: "dist/esm",
      format: "esm",
      sourcemap: true,
      preserveModules: true,
      preserveModulesRoot: "src",
    },
    {
      dir: "dist/cjs",
      format: "cjs",
      sourcemap: true,
      preserveModules: true,
      preserveModulesRoot: "src",
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: false
    }),
  ],
};