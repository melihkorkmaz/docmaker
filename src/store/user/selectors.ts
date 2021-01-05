import TenantModel from '../../models/TenantModel';
import UserModel, { IUserModel } from '../../models/UserModel';
import IState from '../IState';

export const isAuthenticated = (state: IState): boolean => state.user.isAuthenticated;
export const getUser = (state: IState): IUserModel | undefined => {
  if (state.user.isAuthenticated) {
    return new UserModel({
      _id: state.user._id,
      name: state.user.name,
      email: state.user.email,
      tenant: new TenantModel(state.user.tenant),
    });
    
    // if (state.user.tenant) {
    //   user.tenant = new TenantModel(state.user.tenant);
    // }
    
    // return user;
  }
};