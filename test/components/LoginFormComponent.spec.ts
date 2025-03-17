import { describe, it, vi, expect, beforeEach  } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import LoginForm from '../../src/components/LoginForm.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: { template: '<div></div>' },
    },
  ]
});

describe('LoginFormComponent', () => {
  let input = { username: '', password: '' };

  beforeEach(() => {
    input = { username: 'test', password: 'test' };
  });

  it('should redirect user when login success', async () => {
    const successMessage = 'Successfully logged in';
    const authStore = {
      token: vi.fn(),
      signIn: vi.fn().mockReturnValue({ successMessage }),
      signOut: vi.fn()
    };
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
    const errorMessage = 'Username or Password not found';
    const authStore = {
      token: vi.fn(),
      signIn: vi.fn().mockReturnValue({ errorMessage }),
      signOut: vi.fn()
    };
    const wrapper = mount(LoginForm, {
      props: { error: (erroMessage) => erroMessage },
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