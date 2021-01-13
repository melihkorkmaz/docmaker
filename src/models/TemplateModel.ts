import axios from 'axios';
import BaseModel from './BaseModel';

import { createTemplateMutation, updateTemplateMutation } from '../graphql/mutations';
import { getTemplateById } from '../graphql/queries';

import { InputDataType } from '../utility/enums';
import { IAsyncRespone } from '../utility/interfaces';
import TenantModel from './TenantModel';

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

export default class TemplateModel extends BaseModel<TemplateModel> implements TemplateModel {
  public _id?: string;
  public language: string = '';
  public tenant: TenantModel = new TenantModel();
  public file?: File;
  public parametersFromFile?: string[];
  public templateParameters?: TemplateKeyModel[];
  public name: string = '';


  constructor(data?: Partial<TemplateModel>) {
    super();
    this.initModel(data);
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


  public async save(): Promise<IAsyncRespone> {
    return this._id ? this.update() : this.create();
  }


  public async fetch(): Promise<IAsyncRespone> {
    try {
      const res = await this.requestToDB(getTemplateById, { id: this._id }) as TemplateModel;
      this.initModel(res);

      return { status: true };
    } catch (err) {
      //tslint:disable: no-unsafe-any
      return { status: false, error: err.message as string }
    }
  }


  private getFileExt(): string {
    if (!this.file) {
      return '';
    }

    const splittedName = this.file.name.split('.');
    return splittedName[splittedName.length - 1];
  }

  // tslint:disable-next-line: promise-function-async
  private readFile() {
    return new Promise((resolve, reject) => {
      if (!this.file) {
        // tslint:disable-next-line: no-void-expression
        return reject('There is no file to read');
      }

      const fileType = this.file.type;
      const reader = new FileReader();
      reader.addEventListener('loadend', () => {
        if (reader.result) {
          resolve(new Blob([reader.result], { type: fileType }));
        } else {
          reject('Error on read');
        }
      });

      reader.readAsArrayBuffer(this.file);
    })
  }

  private async uploadTemplateFile() {
    if (!this._id) {
      throw new Error('Template has not been saved! No ID');
    }

    if (!this.file) {
      throw new Error('No file to upload!');

    }


    try {
      const { url } = await this.postToAPI('requestUploadUrl', {
        "name": `${this._id}.${this.getFileExt()}`,
        "type": this.file.type,
        "tenantId": this.tenant._id,
      }) as { url: string };

      const fileBlob = await this.readFile();
      await axios.put(url, fileBlob);
    } catch (error) {
      throw new Error('Error on upload');
    }
  }

  private async create(): Promise<IAsyncRespone> {
    const variables = {
      name: this.name,
      language: this.language,
      tenant: this.tenant._id
    };

    try {
      const res = await this.requestToDB(createTemplateMutation, variables) as TemplateModel;

      this.initModel(res);

      await this.uploadTemplateFile();
      const parameters = await this.readParametersFromTempFile();
      this.parametersFromFile = parameters;

      await this.requestToDB(updateTemplateMutation, {
        id: this._id,
        name: this.name,
        language: this.language,
        tenant: this.tenant._id,
        parameters: this.mappedFileParameters,
      });

      return { status: true };
    } catch (err) {
      if (!this._id) {
        // TODO remove template

      }

      //tslint:disable: no-unsafe-any
      return { status: false, error: err.message as string }
    }
  }

  private async update(): Promise<IAsyncRespone> {
    const variables = {
      id: this._id,
      name: this.name,
      language: this.language,
      tenant: this.tenant._id,
      parameters: this.templateParameters,
    };

    if (this.file) {
      await this.uploadTemplateFile();
      const parameters = await this.readParametersFromTempFile();
      this.parametersFromFile = parameters;
      variables.parameters = this.mappedFileParameters;
    }

    await this.requestToDB(updateTemplateMutation, variables);

    return { status: true }
  }

  private async readParametersFromTempFile(): Promise<string[]> {
    return await this.postToAPI('readVariablesFromTemplate', {
      tenantId: this.tenant._id,
      templateId: this._id,
    }) as string[];
  }
}
