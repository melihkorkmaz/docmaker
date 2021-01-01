import IAction, { IErrorPayload } from './IAction';
import IAppState from './IAppState';
import AppActionTypes from './types';

const initialState = {
  initiated: false,
}

const appReducer = (state: IAppState = initialState, action: IAction): IAppState => {
  switch (action.type) {
    case AppActionTypes.HandleError:
      const error = action.payload as IErrorPayload;
      if (!error) {
        return state;
      }
      
      return {
        ...state,
        error: {
          message: error.message,
          description: error.description
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