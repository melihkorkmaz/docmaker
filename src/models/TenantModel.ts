import BaseModel from './BaseModel';
import DocumentModel from './DocumentModel';
import TemplateModel from './TemplateModel';
import UserModel from './UserModel';

import TenantService from '../services/TenantService';
import IModel from './IModel';

interface ITemplates {
  data: TemplateModel[]
}

export default class TenantModel extends BaseModel<TenantModel> implements IModel {
  public _id = '';
  public name = '';
  public users: UserModel[] = [];
  public templates: ITemplates =  { data: [] };
  public documents: DocumentModel[] = [];
  
  constructor(data?: Partial<TenantModel>) {
    super(new TenantService());
    this.populateModel(data);
  }

  public async getTenantTemplates(): Promise<TemplateModel[]> {
    // tslint:disable-next-line: no-unsafe-any
    const res = await (this.service as TenantService).fetchTemplates(this._id);

    return res.templates.data
  }
}