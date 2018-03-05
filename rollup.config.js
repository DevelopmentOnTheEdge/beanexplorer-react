import babel       from 'rollup-plugin-babel'
import resolve     from 'rollup-plugin-node-resolve'


const name = 'PropertySet';
const path = 'dist/beanexplorer-react';

const babelOptions = {
  babelrc: false,
  exclude: 'node_modules/**',
  presets: [ [ 'es2015', { modules: false } ], 'react' ],
  plugins: [ 'external-helpers' ]
};
const globals = {
  'react': 'React',
  'react-dom': 'ReactDOM',
  'prop-types': 'PropTypes',
  'classnames': 'classNames',
  'moment': 'moment',
  'json-pointer': 'JsonPointer',
  'react-datetime': 'Datetime',
  'react-ckeditor-component': 'CKEditor',
  'react-maskedinput': 'MaskedInput',
  'react-select': 'Select',
  'react-virtualized-select': 'VirtualizedSelect',
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
    },
    globals: globals,
    external: external,
    plugins: [babel(babelOptions), resolve()],
  }
];