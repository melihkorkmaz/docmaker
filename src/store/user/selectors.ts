import TenantModel from '../../models/TenantModel';
import UserModel from '../../models/UserModel';
import IState from '../IState';

export const isAuthenticated = (state: IState): boolean => state.user.isAuthenticated;
export const getUser = (state: IState): UserModel | undefined => {
  if (state.user.isAuthenticated) {
    return new UserModel({
      _id: state.user._id,
      name: state.user.name,
      email: state.user.email,
      tenant: new TenantModel(state.user.tenant),
    });
  }
};

export const hasUserTenant = (state: IState): boolean => {
  const user = getUser(state);

  if (!user || !user.tenant) {
    return false;
  }

  if (!user.tenant._id) {
    return false;
  }

  return true;
};

export const getTenant = (state: IState): TenantModel | undefined => {
  if (state.user.tenant) {
    return new TenantModel(state.user.tenant);
  }
}