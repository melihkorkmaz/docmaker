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
  const user = new UserModel();
  
  try {
    await user.fetch();
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
  
  try {
    const token = await user.login();
    
    localStorage.setItem('token', token);
    setClientToken(token);
    await getCurrent()(dispatch);
    dispatch(actions.loginSucceed());
  } catch (err) {
    dispatch(appActions.setDangerToast('Login failed!', err.message));
  }
};

export const register = (request: UserModel) => async (dispatch: Dispatch) => {
  const user = new UserModel({
    email: request.email,
    name: request.name,
    password: request.password
  });
  
  try {
    await user.save();
    dispatch(appActions.setSuccessToast('Sucess', 'You have signed up successfully!'))

  } catch (err) {
    dispatch(appActions.setDangerToast(err.message));
  }
};

export const createTenant = (name: string) => async (dispatch: Dispatch, getState: () => IState) => {
  const state = getState();
  const user = selectors.getUser(state);
  
  if (!user) {
    return;
  }
    
  user.tenant = new TenantModel({ name });

  try {
    await user.addTenant();
    dispatch(actions.createTenant(user));
  } catch (err) {
    dispatch(appActions.setDangerToast(err.message));
  }
}
