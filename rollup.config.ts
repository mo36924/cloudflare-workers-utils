import { builtinModules } from "module";
import typescript from "@rollup/plugin-typescript";
import { defineConfig } from "rollup";
import dts from "rollup-plugin-dts";

export default defineConfig([
  {
    input: "src/index.ts",
    output: [
      { file: "dist/index.mjs", sourcemap: true },
      { file: "dist/index.js", sourcemap: true, format: "commonjs", exports: "auto" },
    ],
    external: builtinModules,
    plugins: [typescript()],
  },
  {
    input: "src/index.ts",
    output: { file: "dist/index.d.ts" },
    plugins: [dts()],
  },
  {
    input: "src/node.ts",
    output: [
      { file: "dist/node.mjs", sourcemap: true },
      { file: "dist/node.js", sourcemap: true, format: "commonjs", exports: "auto" },
    ],
    external: builtinModules,
    plugins: [typescript()],
  },
  {
    input: "src/node.ts",
    output: { file: "dist/node.d.ts" },
    plugins: [dts()],
  },
]);
