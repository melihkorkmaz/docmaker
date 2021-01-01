import { Dispatch } from 'redux';
import { setClientToken } from '../../graphql/graphqlClient';
import { userActions, userOperations } from '../user';

import * as actions from './actions';

export const initializeApp = () => async (dispatch: Dispatch) => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      setClientToken(token);
      await userOperations.getCurrent()(dispatch);
      dispatch(userActions.loginSucceed());
      dispatch(actions.applicationInitiated());
    } catch (err) {
      dispatch(actions.applicationInitiated());
    }
  } else {
    // There is nothing to fetch for now.
    dispatch(actions.applicationInitiated());
  }
};