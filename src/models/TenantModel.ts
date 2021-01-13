import BaseModel from './BaseModel';


export default class TenantModel extends BaseModel<TenantModel> {
  public _id = '';
  public name = '';
  
  constructor(data?: Partial<TenantModel>) {
    super();
    this.initModel(data);
  }
}