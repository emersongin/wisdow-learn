import { describe, it, vi, expect, beforeEach  } from 'vitest';
import LoginFormModel, { LoginFormStatus } from '../../src/models/LoginFormModel';

describe('LoginFormModel', () => {
  let input = { username: '', password: '' };

  beforeEach(() => {
    input = { username: 'test', password: 'test' };
  });

  it('should emit a submit event', () => {
    const form = new LoginFormModel();
    const listener = vi.fn(() => 0);

    form.username = input.username;
    form.password = input.password;
    form.onSubmit(listener);
    form.submit();

    expect(listener).toHaveBeenCalled();
    expect(listener).toHaveBeenCalledWith(input);
  });

  it('should throw an error when validate form and username not found', () => {
    const form = new LoginFormModel();
    input.username = '';

    form.username = input.username;
    form.password = input.password;

    expect(() => form.submit()).toThrowError('Username not found');
    expect(form.status).toBe(LoginFormStatus.ErrorUsernameNotFound);
  });

  it('should throw an error when validate form and password not found', () => {
    const form = new LoginFormModel();
    input.password = '';

    form.username = input.username;
    form.password = input.password;

    expect(() => form.submit()).toThrowError('Password not found');
    expect(form.status).toBe(LoginFormStatus.ErrorPassswordNotFound);
  });
});