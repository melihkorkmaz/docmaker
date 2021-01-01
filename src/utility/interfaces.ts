export interface IRegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ITenant {
  _id: string;
  name: string;
}

export interface IUser {
  _id: string;
  email: string;
  name: string;
  tenant?: ITenant;
}