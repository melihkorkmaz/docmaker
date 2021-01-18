import BaseModel from './BaseModel';
import TenantModel from './TenantModel';

import UserService from '../services/UserService';

import IModel from './IModel';

export default class UserModel extends BaseModel<UserModel> implements IModel {
  public _id = '';
  public name = '';
  public email = '';
  public password = '';
  public tenant?: TenantModel;
  
  constructor(data?: Partial<UserModel>) {
    super(new UserService());
    this.populateModel(data);
  }

  public async login(): Promise<string> {
    const token = await (this.service as UserService).login(this.email, this.password);
    this.password = '';

    return token;
  }

  public async addTenant() {
    this.tenant = await (this.service as UserService).createAndConnectTenans(this);
  }
}

