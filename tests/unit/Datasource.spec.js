import { shallowMount } from '@vue/test-utils';
import Datasource from '../../packages/Datasource/src/main.vue';

const vm = shallowMount(Datasource);

describe('Datasource.vue', () => {
  it('should match the snapshot', () => {
    expect(vm.$el).toMatchSnapshot();
  });
});
