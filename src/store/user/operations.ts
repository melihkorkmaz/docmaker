import { Dispatch } from 'redux';
import { appActions } from '../app';
import * as actions from './actions';
import * as selectors from './selectors';

import client, { setClientToken } from '../../graphql/graphqlClient';
import { createTenantMutation } from '../../graphql/mutations';

import UserModel, { IUserModel } from '../../models/UserModel';

// Interfaces
import { IUser } from '../../utility/interfaces';
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

export const login = (request: IUserModel) => async (dispatch: Dispatch) => {
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

export const register = (request: IUserModel) => async (dispatch: Dispatch) => {
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
  try {
    const state = getState();
    const user = selectors.getUser(state);
    
    if (!user) {
      return;
    }
     
    console.log('user', user)
    const variables = {
      id: user._id,
      user: {
        email: user.email,
        name: user.name,
        tenant: {
          create: {
            name: name
          }
        }
      }
    };
    
    // const data: { updateUser: IUser } = await client.request(createTenantMutation, variables);
    
    // if (data.updateUser.tenant) {
    //   dispatch(actions.createTenant(data.updateUser.tenant));
    // }
  } catch (err) {
    dispatch(appActions.setDangerToast(err.message));
  }
}
