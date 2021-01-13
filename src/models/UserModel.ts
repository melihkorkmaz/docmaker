import { setClientToken } from '../graphql/graphqlClient';
import BaseModel from './BaseModel';
import TenantModel from './TenantModel';

import { createTenantMutation, loginMutation, registerMutation } from '../graphql/mutations';
import { getCurrentUser } from '../graphql/queries';

import { IAsyncRespone } from '../utility/interfaces';

export default class UserModel extends BaseModel<UserModel> {
  public _id = '';
  public name = '';
  public email = '';
  public password = '';
  public tenant?: TenantModel;
  
  constructor(data?: Partial<UserModel>) {
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
        const res = await this.requestToDB(registerMutation, variables) as UserModel;
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
      const res = await this.requestToDB(getCurrentUser) as UserModel;
      
      this.initModel(res);
      
    } catch (err) {
      console.log(err);
    }
  }

  public async createAndConnectTenans(): Promise<IAsyncRespone> {
    if (!this.tenant) {
      throw new Error('Set tenant first!');
    }


    const variables = {
      id: this._id,
      user: {
        email: this.email,
        name: this.name,
        tenant: {
          create: {
            name: this.tenant.name
          }
        }
      }
    };
    
    try {
      const data = await this.requestToDB(createTenantMutation, variables) as UserModel;
      this.tenant = new TenantModel(data.tenant);

      return {
        status: true
      }
    } catch (err) {
      console.log(err);

      return { status: false, error: 'Unexpected error!'};
    }
  }
}

