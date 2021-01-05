export interface IRegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IUser {
  _id: string;
  email: string;
  name: string;
  tenant?: ITenantModel;
}

export interface ITenantModel {
  _id?: string;
  name: string;
}

export interface IAsyncRespone {
  status: boolean;
  error?: string;
}