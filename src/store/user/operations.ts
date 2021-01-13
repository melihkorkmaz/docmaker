import { Dispatch } from 'redux';
import { appActions } from '../app';
import * as actions from './actions';
import * as selectors from './selectors';

import { setClientToken } from '../../graphql/graphqlClient';

import TenantModel from '../../models/TenantModel';
import UserModel from '../../models/UserModel';

// Interfaces
import IState from '../IState';

export const logout = () => (dispatch: Dispatch) => {
  localStorage.removeItem('token');
  setClientToken();
  dispatch(actions.logoutSucceed());
};

export const getCurrent = () => async (dispatch: Dispatch) => {
  try {
    const user = new UserModel();
    await user.fetchUser();
    dispatch(actions.getCurrentUser(user));
  } catch (err) {
    logout()(dispatch);
  }
};

export const login = (request: UserModel) => async (dispatch: Dispatch) => {
  const user = new UserModel({
    email: request.email,
    password: request.password,
  });
  
  const res = await user.login();
  
  if (res.status) {
    await getCurrent()(dispatch);
    dispatch(actions.loginSucceed());
  } else {
    dispatch(appActions.setDangerToast('Login failed!', res.error));
  }
   
};

export const register = (request: UserModel) => async (dispatch: Dispatch) => {
  const user = new UserModel({
    email: request.email,
    name: request.name,
    password: request.password
  });
  
  const res = await user.save();
  
  return res.status ? 
    dispatch(appActions.setSuccessToast('Sucess', 'You have signed up successfully!')):
    dispatch(appActions.setDangerToast(res.error));
};

export const createTenant = (name: string) => async (dispatch: Dispatch, getState: () => IState) => {
  const state = getState();
  const user = selectors.getUser(state);
  
  if (!user) {
    return;
  }
    
  user.tenant = new TenantModel({ name });

  const res = await user.createAndConnectTenans();

  return res.status ? 
    dispatch(actions.createTenant(user)) :
    dispatch(appActions.setDangerToast(res.error));
}
