import BaseModel from './BaseModel';

import { createTemplateMutation } from '../graphql/mutations';

import { IAsyncRespone, ITenantModel } from '../utility/interfaces';

class TenantModel implements ITenantModel {
  public _id?: string;
  public name: string = '';
}

export interface ITemplateModel {
  _id?: string;
  language: string;
  tenant: ITenantModel;
  file?: File;
  name: string;
}

export default class TemplateModel extends BaseModel<ITemplateModel> implements ITemplateModel {
  public _id?: string;
  public language: string = '';
  public tenant: ITenantModel = new TenantModel();
  public file?: File;
  public name: string = '';
  

  constructor(data?: ITemplateModel) {
    super();
    
    if (data) {
      this._id = data._id;
      this.name = data.name;
      this.file = data.file;
      this.language = data.language;
      this.tenant = data.tenant;
    }
  }
  
  public async save(): Promise<IAsyncRespone>{
    if (!this._id) {
      const variables = {
        name: this.name,
        language: this.language,
        tenant: this.tenant._id
      };
      console.log('HERERE')
     try {
        
        const res = await this.requestToDB(createTemplateMutation, variables) as ITemplateModel;
        console.log('res', res)
        this._id = res._id;
        
        await this.uploadTemplateFile();
      
        return { status: true };
     } catch (err) {
       if (!this._id) {
         // TODO remove template
         console.log('remove template', err);
       }
       
       //tslint:disable: no-unsafe-any
       return { status: false, error: err.message as string}
     }
    }
    
    
    // TODO: UPDATE
    return { status: true }
  }
  
  private async uploadTemplateFile() {
    if (!this._id) {
      throw new Error('Template has not been saved! No ID');
    }
    
    if (!this.file) {
      throw new Error('No file to upload!');
      
    }
    
    const formData = new FormData();
    formData.append(
      this._id || '',
      this.file,
      this.file?.name,
    );
    
    try {
      await this.postToAPI('uploadTemplateFile', formData);
    } catch (error) {      
      throw new Error('Error on upload');
    }
  }
  
}
