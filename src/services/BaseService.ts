
import axios from 'axios';
import { RequestDocument, Variables } from "graphql-request/dist/types";
import { default as graphqlClient } from '../graphql/graphqlClient';

abstract class BaseService<T> {

  protected async requestToDB<D>(query: RequestDocument, variables?: Variables): Promise<T | D | string> {
    return graphqlClient.request(query, variables).then(res => {
      // tslint:disable-next-line: no-unsafe-any
      return res[Object.keys(res)[0]];
    });
  }

  protected async postToAPI<D>(endpoint: string, data?: any): Promise<T | D | string> {
    // tslint:disable-next-line: no-unsafe-any
    return axios.post(`/.netlify/functions/${endpoint}`, data).then(res => res.data)
  }
}

export default BaseService;