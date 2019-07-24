import Datasource from './packages/Datasource/index';

const components = [
  Datasource,
];

export function install(Vue) {
  if (install.installed) return;
  install.installed = true;
  components.forEach((component) => {
    Vue.component(component.name, component);
  });
}

const plugin = {
  install,
};

let GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}

export {
  Datasource,
};

export default plugin;
