export interface UserData {
  username: string;
  password: string;
};

export enum LoginFormStatus {
  Ative = 'ative',
  Loading = 'loading',
}