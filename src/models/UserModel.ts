import { setClientToken } from '../graphql/graphqlClient';
import BaseModel from './BaseModel';
import TenantModel, { ITenantModel } from './TenantModel';

import { loginMutation, registerMutation } from '../graphql/mutations';
import { getCurrentUser } from '../graphql/queries';

import { IAsyncRespone } from '../utility/interfaces';

export interface IUserModel {
  _id: string;
  password: string;
  name: string;
  email: string;
  tenant?: ITenantModel;
}

export default class UserModel extends BaseModel<IUserModel> implements IUserModel {
  public _id = '';
  public name = '';
  public email = '';
  public password = '';
  
  constructor(data?: Partial<IUserModel>) {
    super();
    this.initModel(data);
  }
  
  public async save(): Promise<IAsyncRespone>{
    if (!this._id) {
      const variables = {
        name: this.name,
        email: this.email,
        password: this.password
      };
      
      try {
        const res = await this.requestToDB(registerMutation, variables) as IUserModel;
        this._id = res._id;
        
        return { status: true };
      } catch (err) {
        let message = 'Unknown error!';
        //tslint:disable: no-unsafe-any
        if (err && err.message.toLowerCase().includes('instance is not unique.')) {
          message = 'This email is already registered before!'
        }
        
        //tslint:disable: no-unsafe-any
        return { status: false, error: message}
      }
    }
    
    // TODO: UPDATE
    return { status: true }
  }
  
  public async login(): Promise<IAsyncRespone> {
    const variables = {
      email: this.email,
      password: this.password,
    };
    
    try {
      const token = await this.requestToDB(loginMutation, variables) as string;
      localStorage.setItem('token', token);
      setClientToken(token);
      this.password = '';
      
      return { status: true };
    } catch (err) {
      return { status: false, error: 'Email or password is incorrect'}
    }
  }
  
  public async fetchUser() {
    try {
      const res = await this.requestToDB(getCurrentUser) as IUserModel;
      this.initModel(res);
      
    } catch (error) {
      console.log(error);
    }
  }  
}

