import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import LoginPage from '../../src/pages/LoginPage.vue';

describe('LoginPage', () => {
  it('should render', () => {
    const wrapper = mount(LoginPage);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('form').exists()).toBe(true);
  });
});

