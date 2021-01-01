import IAction from './IAction';
import AppActionTypes from './types';

export const handleError = (message: string, description?: string): IAction => ({
  type: AppActionTypes.HandleError,
  payload: {
    message,
    description
  }
});

export const applicationInitiated = (): IAction => ({
  type: AppActionTypes.AppInitiated,
})