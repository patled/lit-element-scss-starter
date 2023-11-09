/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {terser} from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import outputSize from 'rollup-plugin-output-size';
import litSass from '@j1shin/rollup-plugin-lit-sass';
import ts from 'rollup-plugin-ts';

export default {
  input: ['src/my-element.ts', 'src/test/my-element_test.ts'],
  output: {
    dir: './build',
    format: 'esm'
  },
  onwarn(warning) {
    if (warning.code !== 'THIS_IS_UNDEFINED') {
      console.error(`(!) ${warning.message}`);
    }
  },
  plugins: [
    ts(),
    resolve(),
    litSass({
      includePaths: [
        'node_modules',
        // specific module folders for @import "./{file}" statements
      ],
    }),
    /**
     * This minification setup serves the static site generation.
     * For bundling and minification, check the README.md file.
     */
    terser({
      ecma: 2021,
      module: true,
      warnings: true,
      mangle: {
        properties: {
          regex: /^__/,
        },
      },
    }),
    outputSize({
      gzip: false,
    }),
  ],
};
