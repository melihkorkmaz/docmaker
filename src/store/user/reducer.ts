import { ITenantModel, IUser } from '../../utility/interfaces';
import { IAction, IUserState } from './interfaces';
import UserActionTypes from './types';

const initialState = {
  isAuthenticated: false,
};

const userReducer = (state: IUserState = initialState, action: IAction ): IUserState => {
  switch (action.type) {
    case UserActionTypes.LoginSucceed:
      return {
        ...state,
        isAuthenticated: true,
      };
    case UserActionTypes.GetCurrentUserSucceed:
      const user = action.payload as IUser;

      return {
        ...state,
        email: user.email,
        name: user.name,
        _id: user._id,
        tenant: user.tenant,
      };
    case UserActionTypes.LogoutSucceed:
      return initialState;
    case UserActionTypes.CreateTenantSucceed:
      const tenant = action.payload as ITenantModel;
      console.log('tenant', tenant);
      return {
        ...state,
        tenant
      };
    default:
      return state;
  }
};

export default userReducer;