import vue from 'rollup-plugin-vue';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-only';
import pckg from './package.json';

// Dynamic module config
const inputFile = pckg.plugin.entryFile;
const BrowserNamePackage = pckg.plugin.name;
const ModuleNamePackage = pckg.name;

const config = [
  // ESM build to be used with webpack/rollup.
  {
    input: inputFile,
    output: {
      format: 'esm',
      exports: 'named',
      name: ModuleNamePackage,
      file: `dist/${ModuleNamePackage}.esm.js`,
    },
    plugins: [
      resolve({
        extensions: ['.js', '.vue'],
      }),
      commonjs(),
      vue(),
    ],
  },
  // Common Js
  {
    input: inputFile,
    output: {
      format: 'cjs',
      exports: 'named',
      name: ModuleNamePackage,
      file: `dist/${ModuleNamePackage}.cjs.js`,
    },
    plugins: [
      resolve({
        extensions: ['.js', '.vue'],
      }),
      commonjs(),
      vue(),
    ],
  },
  // SSR Build
  {
    input: inputFile,
    output: {
      format: 'cjs',
      exports: 'named',
      name: ModuleNamePackage,
      file: `dist/${ModuleNamePackage}.ssr.js`,
    },
    plugins: [
      resolve({
        extensions: ['.js', '.vue'],
      }),
      commonjs(),
      vue({ template: { optimizeSSR: true } }),
    ],
  },
  // Browser build
  {
    input: inputFile,
    output: {
      format: 'iife',
      exports: 'named',
      name: BrowserNamePackage,
      file: `dist/${ModuleNamePackage}.js`,
    },
    plugins: [
      resolve({
        extensions: ['.js', '.vue'],
      }),
      commonjs(),
      css(),
      vue({ css: false }),
      terser(),
    ],
  },
];

export default config;
