import BaseModel from './BaseModel';

import { InputDataType } from '../utility/enums';

import IModel from './IModel';
import TenantModel from './TenantModel';

import TemplateService from '../services/TemplateService';

export class TemplateKeyModel {
  public key: string = '';
  public keyType: InputDataType = InputDataType.Text;
  public label?: string;
  public placeHolder?: string;

  constructor(data: TemplateKeyModel) {
    this.key = data.key;
    this.keyType = data.keyType;
    this.label = data.label;
    this.placeHolder = data.placeHolder;
  }
}

export default class TemplateModel extends BaseModel<TemplateModel> implements IModel {
  public _id?: string;
  public language: string = '';
  public tenant: TenantModel = new TenantModel();
  public file?: File;
  public parametersFromFile?: string[];
  public templateParameters?: TemplateKeyModel[];
  public name: string = '';


  constructor(data?: Partial<TemplateModel>) {
    super(new TemplateService());
    this.populateModel(data);
  }


  public get mappedFileParameters(): TemplateKeyModel[] {
    if (this.parametersFromFile) {
      return this.parametersFromFile.map(parameter => new TemplateKeyModel({
        key: parameter,
        keyType: InputDataType.Text,
      }));
    }

    return [];
  }
}
