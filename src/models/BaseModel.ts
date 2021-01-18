import 'reflect-metadata';

import IService from '../services/IService';

type Indexable = { [key: string]: any }

type Constructor<T = any> = new(...args: any[]) => T

export default abstract class BaseModel<T> {
  public abstract _id?: string;
  protected service: IService<T>;

  constructor(_service: IService<T>) {
    this.service = _service;
  }

  public async save() {
    if (!this._id) {
      const res = await this.service.create(this as unknown as T);
      this.populateModel(res);

      return;
    }
    const res = await this.service.update(this as unknown as T);
    this.populateModel(res);
  }

  public async fetch() {
    const res = await this.service.read(this._id);
    this.populateModel(res);
  }
  
  protected populateModel(data?: any) {
    if (!data) {
      return;
    }
    // tslint:disable-next-line: no-unsafe-any
    for(const key of Object.keys(data)) {
      if (this.hasOwnProperty(key)) {
        // tslint:disable-next-line: no-unsafe-any
        const factory: Constructor = Reflect.getMetadata('design:type', this, key);
        
        // tslint:disable-next-line: no-unsafe-any
        (this as Indexable)[key] = factory ? new factory(data[key]) : data[key];
      }
    }
  }
}