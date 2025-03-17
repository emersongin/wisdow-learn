import { describe, it, vi, expect, beforeEach, beforeAll  } from 'vitest';
import { mount } from '@vue/test-utils';
import LoginPage from '../../src/pages/LoginPage.vue';
import { type AuthStore } from '../../src/stores/AuthStore';
import { createRouter, createWebHistory, Router } from 'vue-router';

describe('LoginPage', () => {
    let router: Router;
    let authStore: AuthStore;
  let input = { username: '', password: '' };                                           ;

  beforeAll(() => {
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

  it('should open modal when an error is emitted', async () => {
    const wrapper = mount(LoginPage, {
      global: { 
        provide: { authStore },
        plugins: [ router ],
      },
      stubs: {
        LoginForm: {
          template: '<div @error="emitError"></div>',
        }
      }
    });

    await wrapper.findComponent({ name: 'LoginForm' }).vm.$emit('error', 'Error message found');

    expect(wrapper.find('.modal.is-active').exists()).toBe(true);
    expect(wrapper.find('.modal-card-body').text()).toContain('Error message found');

    await wrapper.find('#close-button').trigger('click');

    expect(wrapper.find('.modal.is-active').exists()).toBe(false);
  });
});