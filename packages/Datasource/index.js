import Datasource from './src/main.vue';

Datasource.install = (Vue) => {
  Vue.component(Datasource.name, Datasource);
};

export default Datasource;
