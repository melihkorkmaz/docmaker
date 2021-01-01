import UserActionTypes from './types';

import { ITenant, IUser } from '../../utility/interfaces';
import { IAction } from './interfaces';

export const loginSucceed = (): IAction => ({
  type: UserActionTypes.LoginSucceed
});

export const getCurrentUser = (user: IUser): IAction => ({
  type: UserActionTypes.GetCurrentUserSucceed,
  payload: user,
});

export const logoutSucceed = (): IAction => ({
  type: UserActionTypes.LogoutSucceed,
});

export const createTenant = (tenant: ITenant): IAction => ({
  type: UserActionTypes.CreateTenantSucceed,
  payload: tenant,
})