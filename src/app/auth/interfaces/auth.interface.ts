export interface IAuth {
  token: string;
  expiresIn: number;
  role: string;
  message: string;
}

export interface ILogin {
  email: string;
  password: string;
}
