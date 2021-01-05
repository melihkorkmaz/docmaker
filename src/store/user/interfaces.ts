import { ITenantModel, IUser } from '../../utility/interfaces';
import UserActionTypes from './types';

export interface IAction {
  type: UserActionTypes,
  payload?: IUser | ITenantModel,
}

export interface IUserState {
  isAuthenticated: boolean;
  email?: string;
  name?: string;
  _id?: string;
  tenant?: ITenantModel
}