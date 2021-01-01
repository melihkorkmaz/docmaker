import { IUser } from '../../utility/interfaces';
import IState from '../IState';

export const isAuthenticated = (state: IState): boolean => state.user.isAuthenticated;
export const getUser = (state: IState): IUser | void => {
  if (state.user.isAuthenticated) {
    return {
      _id: state.user._id || '',
      name: state.user.name || '',
      email: state.user.email || '',
      tenant: state.user.tenant,
    }
  }
};