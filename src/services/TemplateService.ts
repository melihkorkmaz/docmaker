import axios from 'axios';

import TemplateModel from '../models/TemplateModel';
import IService from "./IService";

import { createTemplateMutation, updateTemplateMutation } from '../graphql/mutations';
import { getTemplateById } from '../graphql/queries';
import BaseService from './BaseService';

class TemplateService extends BaseService<TemplateModel> implements IService<TemplateModel> {
  public async create(model: TemplateModel): Promise<TemplateModel> {
    const variables = {
      name: model.name,
      language: model.language,
      tenant: model.tenant._id
    };

    const res = await this.requestToDB(createTemplateMutation, variables) as TemplateModel;
    res.file = model.file;
    
    await this.uploadTemplateFile(res);

    const parameters = await this.readParametersFromTempFile(res);
    model.parametersFromFile = parameters;

    return await this.requestToDB(updateTemplateMutation, {
      id: res._id,
      name: res.name,
      language: res.language,
      tenant: res.tenant._id,
      parameters: model.mappedFileParameters,
    }) as TemplateModel;
  }

  public async update(model: TemplateModel): Promise<TemplateModel> {
    const variables = {
      id: model._id,
      name: model.name,
      language: model.language,
      tenant: model.tenant._id,
      parameters: model.templateParameters,
    };

    if (model.file) {
      await this.uploadTemplateFile(model);
      const parameters = await this.readParametersFromTempFile(model);
      model.parametersFromFile = parameters;
      variables.parameters = model.mappedFileParameters;
    }

    return await this.requestToDB(updateTemplateMutation, variables) as TemplateModel;
  }
  
  public async read(id: string): Promise<TemplateModel> {
    return await this.requestToDB(getTemplateById, { id }) as TemplateModel;
  }
  public async delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  
  private async uploadTemplateFile(model: TemplateModel) {
    if (!model._id) {
      throw new Error('Template has not been saved! No ID');
    }

    if (!model.file) {
      throw new Error('No file to upload!');
    }


    try {
      const { url } = await this.postToAPI('requestUploadUrl', {
        "name": `${model._id}.${this.getFileExt(model)}`,
        "type": model.file.type,
        "tenantId": model.tenant._id,
      }) as { url: string };

      const fileBlob = await this.readFile(model);
      await axios.put(url, fileBlob);
    } catch (error) {
      throw new Error('Error on upload');
    }
  }

  private getFileExt(model: TemplateModel): string {
    if (!model.file) {
      return '';
    }

    const splittedName = model.file.name.split('.');

    return splittedName[splittedName.length - 1];
  }

  // tslint:disable-next-line: promise-function-async
  private readFile(model: TemplateModel) {
    return new Promise((resolve, reject) => {
      if (!model.file) {
        // tslint:disable-next-line: no-void-expression
        return reject('There is no file to read');
      }

      const fileType = model.file.type;
      const reader = new FileReader();
      reader.addEventListener('loadend', () => {
        if (reader.result) {
          resolve(new Blob([reader.result], { type: fileType }));
        } else {
          reject('Error on read');
        }
      });

      reader.readAsArrayBuffer(model.file);
    })
  }

  private async readParametersFromTempFile(model: TemplateModel): Promise<string[]> {
    return await this.postToAPI('readVariablesFromTemplate', {
      tenantId: model.tenant._id,
      templateId: model._id,
    }) as string[];
  }

}

export default TemplateService;