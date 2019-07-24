# [Datasource](https://github.com/coderdiaz/vue-datasource) &middot; [![NPMVERSION](https://img.shields.io/npm/v/vue-datasource.svg)](http://npmjs.com/package/vue-datasource) [![GITHUBSTARS](https://img.shields.io/github/stars/coderdiaz/vue-datasource.svg)](https://github.com/coderdiaz/vue-datasource/stargazers) [![BUILD](https://travis-ci.org/coderdiaz/vue-datasource.svg?branch=master)](https://travis-ci.org/coderdiaz/vue-datasource) [![DOWNLOADS](https://img.shields.io/npm/dt/vue-datasource.svg)](https://npmjs.com/package/vue-datasource)

A Vue component to create dynamic tables. Compatible with Vue 2.x.

## Install/Usage
<!-- Replace the docs for usage the plugin -->
```sh
# Install with npm
$ npm i -S vue-datasource

# or yarn
$ yarn add vue-datasource
```

```html
<div id="app"></div>
```

You can use **Local Registration**:
```js
import { Datasource } from 'vue-datasource';
new Vue({
  el: '#app',
  components: {
    Datasource,
  },
});
```

or **Global Registration**:
```js
import Datasource from 'vue-datasource';
Vue.use(Datasource);

// or with a custom component name
import { Datasource } from 'vue-datasource';
Vue.component('custom-name', Datasource);
```

### Usage in browser
<!-- Write an example for use the plugin in browser from CDN -->
In browser you can use Unpkg, Jsdelivr, CDN.js, etc.
```sh
# Unpkg
https://unpkg.com/vue-datasource@latest/dist/vue-datasource.js

# JSDelivr
https://cdn.jsdelivr.net/npm/vue-datasource@latest/dist/vue-datasource.min.js
```

## Documentation
<!-- Add all documentation about the plugin: props, events, etc -->
### Props


## Community
All feedback and suggestions are welcome!

## License
This is a open-source software licensed under the [MIT license](https://raw.githubusercontent.com/coderdiaz/vue-datasource/master/LICENSE)