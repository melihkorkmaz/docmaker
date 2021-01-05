import { IAsyncRespone } from '../utility/interfaces';
import BaseModel from './BaseModel';

export interface ITenantModel {
  _id: string;
  name: string;
}

export default class TenantModel extends BaseModel<ITenantModel> implements ITenantModel {
  public _id = '';
  public name = '';
  
  constructor(data?: Partial<ITenantModel>) {
    super();
    this.initModel(data);
  }
  
  // public save(): Promise<IAsyncRespone> {
    
  // }
}