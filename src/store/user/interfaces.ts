import { ITenant, IUser } from '../../utility/interfaces';
import UserActionTypes from './types';

export interface IAction {
  type: UserActionTypes,
  payload?: IUser | ITenant,
}

export interface IUserState {
  isAuthenticated: boolean;
  email?: string;
  name?: string;
  _id?: string;
  tenant?: ITenant
}