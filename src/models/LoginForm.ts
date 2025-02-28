import EventBus, { type Listener } from '@/models/EventBus';
import { type UserData, LoginFormStatus } from '@/types/LoginFormTypes';

export default class LoginForm extends EventBus {
  public username: string;
  public password: string;
  public status: LoginFormStatus = LoginFormStatus.Ative;
  public error: string = '';

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
    this.emit('submit', {
      username: this.username,
      password: this.password
    } as UserData);
  }
}