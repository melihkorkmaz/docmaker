import AppActionTypes from './types';

export interface IErrorPayload {
  message: string;
  description?: string;
}

export default interface IAction {
  type: AppActionTypes,
  payload?: IErrorPayload,
}