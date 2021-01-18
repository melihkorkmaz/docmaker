import DocumentModel from '../models/DocumentModel';

import BaseService from './BaseService';

import { createDocumentMutation } from '../graphql/mutations';

import IService from './IService';

class DocumentService extends BaseService<DocumentModel> implements IService<DocumentModel> {
  public async create(model: DocumentModel): Promise<DocumentModel> {
    const variables = {
      name: model.name,
      majorVersion: model.majorVersion,
      minorVersion: model.minorVersion,
      tenant: {
        connect: model.tenant._id
      },
      template: {
        connect: model.template._id
      }
    };

    return await this.requestToDB(createDocumentMutation, { document: variables }) as DocumentModel;
  }

  public async update(model: DocumentModel): Promise<DocumentModel> {
    throw new Error('Method not implemented.');
  }

  public async read(id: string): Promise<DocumentModel> {
    throw new Error('Method not implemented.');
  }

  public async delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

}

export default DocumentService;