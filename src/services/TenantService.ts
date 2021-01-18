import BaseService from "./BaseService";
import IService from "./IService";

import TenantModel from '../models/TenantModel';

import { getTenantTemplates } from '../graphql/queries';

class TenantService extends BaseService<TenantModel> implements IService<TenantModel> {
  public async create(model: TenantModel): Promise<TenantModel> {
    throw new Error("Method not implemented.");
  }

  public async update(model: TenantModel): Promise<TenantModel> {
    throw new Error("Method not implemented.");
  }

  public async read(id: string): Promise<TenantModel> {
    throw new Error("Method not implemented.");
  }

  public async delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public async fetchTemplates(id: string): Promise<TenantModel> {
    return await this.requestToDB(getTenantTemplates, { id }) as TenantModel;
  }
}

export default TenantService;