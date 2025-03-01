import EventBus, { type Listener } from '@/models/EventBus';
import type UserData from '@/types/UserDataType';

export enum  LoginFormStatus {
  Ative = 'ative',
  Loading = 'loading',
  Error = 'error'
}

export default class LoginFormModel extends EventBus {
  public username: string;
  public password: string;
  public status: LoginFormStatus = LoginFormStatus.Ative;
  public errorMessage: string = '';

  constructor(username: string = '', password: string = '') {
    super();
    this.username = username;
    this.password = password;
  }

  onSubmit(listener: Listener<UserData>): () => void {
    return this.on('submit', listener);
  }

  loading() {
    this.status = LoginFormStatus.Loading;
  }

  submit(): void {
    try {
      this.validate();
      this.emit('submit', {
        username: this.username,
        password: this.password
      } as UserData);
    } catch (error: Error | unknown) {
      this.errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.status = LoginFormStatus.Error; 
    }
  }

  validate(): void {
    if (this.username === '') {
      throw new Error('Username not found');
    }
    if (this.password === '') {
      throw new Error('Password not found');
    }
  }
}