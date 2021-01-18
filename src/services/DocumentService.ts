import DocumentModel from '../models/DocumentModel';

import BaseService from './BaseService';

import IService from './IService';

class DocumentService extends BaseService<DocumentModel> implements IService<DocumentModel> {
  public async create(model: DocumentModel): Promise<DocumentModel> {
    throw new Error('Method not implemented.');
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