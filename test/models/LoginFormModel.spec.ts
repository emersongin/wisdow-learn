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

    expect(() => form.validate()).toThrowError('Username not found');

    form.submit();
    
    expect(form.status).toBe(LoginFormStatus.Error);
    expect(form.errorMessage).toBe('Username not found');
  });

  it('should throw an error when validate form and password not found', () => {
    const form = new LoginFormModel();
    input.password = '';

    form.username = input.username;
    form.password = input.password;

    expect(() => form.validate()).toThrowError('Password not found');

    form.submit();

    expect(form.status).toBe(LoginFormStatus.Error);
    expect(form.errorMessage).toBe('Password not found');
  });
});