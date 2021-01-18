import { IAction, IUserState } from './interfaces';
import UserActionTypes from './types';

import UserModel from '../../models/UserModel';

const initialState = {
  isAuthenticated: false,
};

const userReducer = (state: IUserState = initialState, action: IAction ): IUserState => {
  let user: UserModel;
  switch (action.type) {
    case UserActionTypes.LoginSucceed:
      return {
        ...state,
        isAuthenticated: true,
      };
    case UserActionTypes.GetCurrentUserSucceed:
      user = action.payload as UserModel;

      return {
        ...state,
        email: user.email,
        name: user.name,
        _id: user._id,
        tenant: user.tenant,
        isAuthenticated: true,
      };
    case UserActionTypes.LogoutSucceed:
      return initialState;
    case UserActionTypes.CreateTenantSucceed:
      user = action.payload as UserModel;
      
      return {
        ...state,
        ...user,
      };
    default:
      return state;
  }
};

export default userReducer;