import BaseModel from './BaseModel';
import TemplateModel from './TemplateModel';
import TenantModel from './TenantModel';

import DocumentService from '../services/DocumentService';

import IModel from './IModel';

export default class DocumentModel extends BaseModel<DocumentModel> implements IModel {
  public _id = '';
  public name = '';
  public majorVersion = 0;
  public minorVersion = 0;
  public tenant: TenantModel = new TenantModel();
  public template: TemplateModel = new TemplateModel();

  constructor(data?: Partial<DocumentModel>) {
    super(new DocumentService());
    this.populateModel(data);
  }
}