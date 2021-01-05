import axios from 'axios';
import { RequestDocument, Variables } from "graphql-request/dist/types";
import 'reflect-metadata';
import { default as graphqlClient } from '../graphql/graphqlClient';


const getProperty = <T, K extends keyof T>(obj: T, key: K) => { 
  return obj[key];
}

type Indexable = { [key: string]: any }

type Constructor<T = any> = new(...args: any[]) => T

export default abstract class BaseModel<T> {
  
  protected async requestToDB(query: RequestDocument, variables?: Variables): Promise<T | string> {
    return graphqlClient.request(query, variables).then(res => {
      // tslint:disable-next-line: no-unsafe-any
      return res[Object.keys(res)[0]];
    });
  }
  
  protected async postToAPI(endpoint: string, data?: any) {
    return axios.post(`/.netlify/functions/${endpoint}`, data)
  }
  
  protected initModel(data?: any) {
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