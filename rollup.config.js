import babel       from '@rollup/plugin-babel'
import resolve     from '@rollup/plugin-node-resolve'
// import {terser}    from 'rollup-plugin-terser';


const name = 'PropertySet';
const path = 'dist/beanexplorer-react';

const babelOptions = {
  babelrc: false,
  exclude: 'node_modules/**',
  presets: [ [ '@babel/env', { modules: false } ], '@babel/react' ],
  // todo make babelHelpers: external, now insert undefinied var babelHelpers
  // plugins: [ '@babel/external-helpers' ],
  babelHelpers: 'inline',
};
const globals = {
  'react': 'React',
  'react-dom': 'ReactDOM',
  'prop-types': 'PropTypes',
  'classnames': 'classNames',
  'moment': 'moment',
  'json-pointer': 'JsonPointer',
  'react-datetime': 'Datetime',
  'ckeditor4-react': 'CKEditor',
  'react-maskedinput': 'MaskedInput',
  'react-select': 'Select',
  'react-virtualized-select': 'VirtualizedSelect',
  'big-integer': 'bigInt',
  'big-rational': 'bigRat'
};
const external = Object.keys(globals);

export default [
  {
    input: 'src/index.js',
    output: {
      file: path + '.es.js',
      format: 'es',
    },
    external: external,
    plugins: [babel(babelOptions)],
  },
  {
    input: 'src/index.umd.js',
    output: {
      name: name,
      file: path + '.js',
      format: 'umd',
      globals: globals,
    },
    external: external,
    plugins: [babel(babelOptions),resolve()],
  }
];