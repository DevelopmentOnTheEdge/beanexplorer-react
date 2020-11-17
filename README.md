# beanexplorer-react 
React component for [BeanExplorer](https://github.com/DevelopmentOnTheEdge/beanexplorer) beans, 
serialized in [beans-json](https://github.com/DevelopmentOnTheEdge/beanexplorer/tree/master/json) 

[![NPM Version](https://img.shields.io/npm/v/beanexplorer-react.svg?branch=master)](https://www.npmjs.com/package/beanexplorer-react)
[![Build Status](https://travis-ci.org/DevelopmentOnTheEdge/beanexplorer-react.svg?branch=master)](https://travis-ci.org/DevelopmentOnTheEdge/beanexplorer-react)
[![dependencies Status](https://david-dm.org/DevelopmentOnTheEdge/beanexplorer-react/status.svg)](https://david-dm.org/DevelopmentOnTheEdge/beanexplorer-react)
[![Coverage Status](https://coveralls.io/repos/github/DevelopmentOnTheEdge/beanexplorer-react/badge.svg?branch=master)](https://coveralls.io/github/DevelopmentOnTheEdge/beanexplorer-react?branch=master)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)

### Demo & Examples
Live demo: [https://developmentontheedge.github.io/beanexplorer-react/](https://developmentontheedge.github.io/beanexplorer-react/)

### Installation
```sh
$ npm install --save beanexplorer-react
```

### Usage
```js
import PropertySet from 'beanexplorer-react';

import 'react-datetime/css/react-datetime.css';
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';

render() {
  const bean = {
      "values": {
          "name": "",
      },
      "meta": {
          "/name": {"displayName": "Name"},
      },
      "order": [
          "/name",
      ]
  };
  <PropertySet bean={bean} onChange={this.handleChange}/>
}
```

### Development

Install dependencies:
```sh
$ npm install
```

Run the example app at http://127.0.0.1:8887/beanexplorer-react/
```sh
$ npm start
```

Run tests
```sh
$ npm test
$ npm run watch
```

Build example or library:
```sh
$ npm run example
$ npm run lib
```
### Deploy
```sh
sh build.sh
npm run up
```
