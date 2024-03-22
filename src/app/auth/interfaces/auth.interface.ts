export interface IAuth {
  token: string;
  expiresIn: number;
  roles: Array<string>;
  message: string;
}

export interface ILogin {
  username: string;
  password: string;
}
