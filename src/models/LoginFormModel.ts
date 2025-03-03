import EventBus, { type Listener } from '@/models/EventBus';
import type UserData from '@/types/UserDataType';

export enum LoginFormStatus {
  Idle = 'idle',
  Loading = 'loading',
  ErrorUsernameNotFound = 'error_username_not_found',
  ErrorPassswordNotFound = 'error_password_not_found'
}

export default class LoginFormModel extends EventBus {
  public username: string;
  public password: string;
  public status: LoginFormStatus = LoginFormStatus.Idle;

  constructor(username: string = '', password: string = '') {
    super();
    this.username = username;
    this.password = password;
  }

  onSubmit(listener: Listener<UserData>): () => void {
    return this.on('submit', listener);
  }

  submit(): void {
    this.validate();
    this.emit('submit', {
      username: this.username,
      password: this.password
    } as UserData);
  }

  validate(): void {
    if (this.username === '') {
      this.errorUsernameNotFound();
      throw new Error('Username not found');
    }
    if (this.password === '') {
      this.errorPasswordNotFound();
      throw new Error('Password not found');
    }
  }

  idle() {
    this.status = LoginFormStatus.Idle;
  }

  loading() {
    this.status = LoginFormStatus.Loading;
  }

  errorUsernameNotFound() {
    this.status = LoginFormStatus.ErrorUsernameNotFound; 
  }

  errorPasswordNotFound() {
    this.status = LoginFormStatus.ErrorPassswordNotFound;
  }

  isIdle(): boolean {
    return this.status === LoginFormStatus.Idle;
  }

  isLoading(): boolean {
    return this.status === LoginFormStatus.Loading;
  }

  isErrorUsernameNotFound(): boolean {
    return this.status === LoginFormStatus.ErrorUsernameNotFound
  }

  isErrorPasswordNotFound(): boolean {
    return this.status === LoginFormStatus.ErrorPassswordNotFound;
  }
}