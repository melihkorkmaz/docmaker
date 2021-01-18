import BaseService from './BaseService';
import IService from './IService';

import TenantModel from '../models/TenantModel';
import UserModel from '../models/UserModel';

import { createTenantMutation, loginMutation, registerMutation } from '../graphql/mutations';
import { getCurrentUser } from '../graphql/queries';

class UserService extends BaseService<UserModel> implements IService<UserModel> {
  public async create(model: UserModel): Promise<UserModel> {
    const variables = {
      name: model.name,
      email: model.email,
      password: model.password
    };

    return await this.requestToDB(registerMutation, variables) as UserModel;
  }

  public async update(model: UserModel): Promise<UserModel> {
    throw new Error('Method not implemented.');
  }

  public async read(id: string): Promise<UserModel> {
    return await this.requestToDB(getCurrentUser) as UserModel;
  }

  public async delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  
  public async login(email: string, password: string): Promise<string> {
    const variables = {
      email,
      password,
    };

   try {
    return await this.requestToDB(loginMutation, variables) as string;
   } catch (err) {
     
    throw new Error('Email or password is incorrect');
   }
  }

  public async createAndConnectTenans(model: UserModel): Promise<TenantModel> {
    if (!model.tenant) {
      throw new Error('Set tenant first!');
    }
    
    const variables = {
      id: model._id,
      user: {
        email: model.email,
        name: model.name,
        tenant: {
          create: {
            name: model.tenant.name
          }
        }
      }
    };
    
    const data = await this.requestToDB(createTenantMutation, variables) as UserModel;
    
    return new TenantModel(data.tenant);
  }
}

export default UserService;