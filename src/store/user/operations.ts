import { Dispatch } from 'redux';
import { appActions } from '../app';
import * as actions from './actions';

import client, { setClientToken } from '../../graphql/graphqlClient';
import { loginMutation, registerMutation } from '../../graphql/mutations';
import { getCurrentUser } from '../../graphql/queries';

// Interfaces
import { ILoginRequest, IRegisterRequest, IUser } from '../../utility/interfaces';

export const getCurrent = () => async (dispatch: Dispatch) => {
  try {
    const data: { getCurrentUser: IUser } = await client.request(getCurrentUser);
    dispatch(actions.getCurrentUser(data.getCurrentUser));
  } catch (err) {
    // TODO: Move logic to logout.
    // Set client token to default;
    setClientToken();
  }
};

export const login = (request: ILoginRequest) => async (dispatch: Dispatch) => {
  try {
    const data: { login: string }= await client.request(loginMutation, request);
    const token = data.login;
    localStorage.setItem('token', token);
    setClientToken(token);
    await getCurrent()(dispatch)
    dispatch(actions.loginSucceed());
  } catch (err) {
    dispatch(appActions.handleError('Login failed!', 'Email or password is incorrect'));
  }
};

export const register = (request: IRegisterRequest) => async (dispatch: Dispatch) => {
  try {
    await client.request(registerMutation, request);
    await login({ email: request.email, password: request.password })(dispatch);
  } catch (err) {
    let message = 'Unknown error!';
    //tslint:disable: no-unsafe-any
    if (err && err.message.toLowerCase().includes('instance is not unique.')) {
      message = 'This email is already registered before!'
    }
    dispatch(appActions.handleError(message));
  }
};

export const logout = () => (dispatch: Dispatch) => {
  localStorage.removeItem('token');
  setClientToken();
  dispatch(actions.logoutSucceed());
};