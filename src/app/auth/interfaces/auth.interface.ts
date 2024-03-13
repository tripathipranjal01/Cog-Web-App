export interface IAuth {
  token: string;
  expiresIn: number;
  role: string;
  message: string;
}

export interface ILogin {
  companyName: string;
  email: string;
  password: string;
}
