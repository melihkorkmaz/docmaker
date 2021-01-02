import IAction, { IToastPayload } from './IAction';
import IAppState from './IAppState';
import AppActionTypes from './types';

const initialState = {
  initiated: false,
}

const appReducer = (state: IAppState = initialState, action: IAction): IAppState => {
  switch (action.type) {
    case AppActionTypes.SetToastMessage:
      const toast = action.payload as IToastPayload;
      if (!toast) {
        return state;
      }
      
      return {
        ...state,
        toast: {
          message: toast.message,
          description: toast.description,
          type: toast.type,
        }
      };
    case AppActionTypes.AppInitiated: 
      return {
        ...state,
        initiated: true,
      }
    default:
      return state;
  }
};

export default appReducer;