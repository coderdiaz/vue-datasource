# Vue Datasource
#### A Vue.js component to create tables from Server Side. Compatible with Vue 2.x and Laravel

### Demo

Temporal: http://recordit.co/F9c92b277R

Coming soon live demo ...

### Install/Usage
```
$ npm install vue-datasource
```

```html
    <div id="#app">
        <datasource
            language="en"
            :table-data="information.data"
            :columns="columns"
            :pagination="information.pagination"
            :actions="actions"
            v-on:change="changePage"
            v-on:searching="onSearch"></datasource>
    </div>
```

```javascript
import Datasource from 'vue-datasource'

new Vue({
    el: '#app',
    components: {
        Datasource
    },
    data() {
        return {
            information: {
                pagination: {...},
                data: [...]
            },
            columns: [...],
            actions: [...]
        }
    },
    methods: {
        changePage(values) {...},
        onSearch(searchQuery) {...}
    }
});
```

### Available Props
| Prop        | Type    | Default | Description                                                 |
|-------------|---------|---------|-------------------------------------------------------------|
| tableData   | Array   |         | The table information to display                            |
| language    | String  | es      | Defines the language with which the table will be displayed |
| columns     | Array   |         | Columns to display in table                                 |
| pagination  | Object  |         | Information about data collection to paginate               |
| actions     | Array   |         | Buttons to perform action on click event                    |

### Available Events
| Event       | Description                                    |
|-------------|------------------------------------------------|
| change      | Return the limit per page and the current page |
| searching   | Return the string to search                    |

### Render column value with custom format
To show the value of a column with a custom format uses the render property, this will allow you to get the original value and return it in the way you define.
```javascript
{ 
    ...,
    columns: [
        {
            name: 'Name', // Header name column
            // Name of column on table. If you are working in Laravel 
            // you can access the relationships using 'relation.key'
            key: 'name', 
            render(value) {
                return `Enginner ${value}`;
            }
        }
    ]
}
```

### Implementation examples
- Using Laravel 5.3 and pagination: [laravel-datasource-example](https://github.com/coderdiaz/laravel-datasource-example).

_You can add implementations send me your PR._

### Contributions 
All contributions are welcome send your PR and Issues.

#### Created by Javier Diaz
