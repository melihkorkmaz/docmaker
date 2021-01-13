import UserActionTypes from './types';

import UserModel from '../../models/UserModel';
import { IAction } from './interfaces';

export const loginSucceed = (): IAction => ({
  type: UserActionTypes.LoginSucceed
});

export const getCurrentUser = (user: UserModel): IAction => ({
  type: UserActionTypes.GetCurrentUserSucceed,
  payload: user,
});

export const logoutSucceed = (): IAction => ({
  type: UserActionTypes.LogoutSucceed,
});

export const createTenant = (user: UserModel): IAction => ({
  type: UserActionTypes.CreateTenantSucceed,
  payload: user,
})