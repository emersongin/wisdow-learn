import { describe, it, vi, expect, beforeEach  } from 'vitest';
import { mount } from '@vue/test-utils';
import { type AuthStore } from '../../src/stores/AuthStore';
import { createRouter, createWebHistory, Router } from 'vue-router';
import LoginForm from '../../src/components/LoginForm.vue';

describe('LoginFormComponent', () => {
  let input = { username: '', password: '' };
  let router: Router;
  let authStore: AuthStore;

  beforeEach(() => {
    input = { username: 'test', password: 'test' };
    router = createRouter({
      history: createWebHistory(),
      routes: [
        {
          path: '/',
          component: { template: '<div></div>' },
        },
      ]
    });
    authStore = {
      token: 'mock-token',
      signIn: vi.fn(),
      signOut: vi.fn()
    };
  });

  it('should redirect user when login success', async () => {
    const successMessage = 'Successfully logged in';
    authStore.signIn = vi.fn().mockReturnValue({ successMessage });
    router.push = vi.fn();
    const wrapper = mount(LoginForm, {
      global: { 
        provide: { authStore },
        plugins: [ router ],
      },
    });

    await wrapper.find('input[type="text"]').setValue(input.username);
    await wrapper.find('input[type="password"]').setValue(input.password);
    await wrapper.find('form').trigger('submit');

    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'dashboard' });
  });

  it('should emit an error message when username invalid', async () => {
    const errorMessage = 'Error message found';
    authStore.signIn = vi.fn().mockReturnValue({ errorMessage });
    const wrapper = mount(LoginForm, {
      global: { 
        provide: { authStore },
        plugins: [ router ],
      },
    });

    await wrapper.find('input[type="text"]').setValue(input.username);
    await wrapper.find('input[type="password"]').setValue(input.password);
    await wrapper.find('form').trigger('submit');

    expect(wrapper.emitted().error).toBeTruthy();
    expect(wrapper.emitted().error[0]).toEqual([ errorMessage ]);
  });
});