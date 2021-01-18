import { Dispatch } from 'redux';
import { setClientToken } from '../../graphql/graphqlClient';
import { userOperations } from '../user';

import * as actions from './actions';

export const initializeApp = () => async (dispatch: Dispatch) => {
  const token = localStorage.getItem('token');
  if (token) {
    setClientToken(token);
    await userOperations.getCurrent()(dispatch);
    dispatch(actions.applicationInitiated());
  } else {
    // There is nothing to fetch for now.
    dispatch(actions.applicationInitiated());
  }
};