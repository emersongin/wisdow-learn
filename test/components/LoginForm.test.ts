import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import LoginForm from '../../src/components/LoginForm.vue';

describe('LoginForm', () => {
  it('should render', () => {
    const wrapper = mount(LoginForm);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('input[type="text"]').exists()).toBe(true);
    expect(wrapper.find('input[type="password"]').exists()).toBe(true);
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true);
  });
});