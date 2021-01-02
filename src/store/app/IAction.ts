import { ToastType } from '../../utility/enums';
import AppActionTypes from './types';

export interface IToastPayload {
  message: string;
  description?: string;
  type: ToastType
}

export default interface IAction {
  type: AppActionTypes,
  payload?: IToastPayload,
}