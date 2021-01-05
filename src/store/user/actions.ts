import UserActionTypes from './types';

import { IUserModel } from '../../models/UserModel';
import { ITenantModel } from '../../utility/interfaces';
import { IAction } from './interfaces';

export const loginSucceed = (): IAction => ({
  type: UserActionTypes.LoginSucceed
});

export const getCurrentUser = (user: IUserModel): IAction => ({
  type: UserActionTypes.GetCurrentUserSucceed,
  payload: user,
});

export const logoutSucceed = (): IAction => ({
  type: UserActionTypes.LogoutSucceed,
});

export const createTenant = (tenant: ITenantModel): IAction => ({
  type: UserActionTypes.CreateTenantSucceed,
  payload: tenant,
})