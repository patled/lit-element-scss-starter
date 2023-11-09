// type information for scss files imports, taken from https://github.com/ponday-dev/rollup-plugin-lit-sass
declare module '*.scss' {
  import {css, CSSResult} from 'lit';
  const scss: (params: {css: typeof css}) => CSSResult;
  export default scss;
}
