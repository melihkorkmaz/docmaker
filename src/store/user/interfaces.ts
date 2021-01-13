import TenantModel from '../../models/TenantModel';
import UserModel from '../../models/UserModel';
import UserActionTypes from './types';

export interface IAction {
  type: UserActionTypes,
  payload?: UserModel,
}

export interface IUserState {
  isAuthenticated: boolean;
  email?: string;
  name?: string;
  _id?: string;
  tenant?: TenantModel
}