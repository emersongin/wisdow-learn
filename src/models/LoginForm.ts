import EventBus, { type Listener } from '@/models/EventBus';

export type LoginFormData = {
  username: string;
  password: string;
};

export default class LoginForm extends EventBus {
  public username: string;
  public password: string;

  constructor(username: string = '', password: string = '') {
    super();
    this.username = username;
    this.password = password;
  }

  onSubmit(listener: Listener<LoginFormData>): () => void {
    return this.on('submit', listener);
  }

  submit(): void {
    this.emit('submit', {
      username: this.username,
      password: this.password
    });
  }
}