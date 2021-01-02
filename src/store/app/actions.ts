import { ToastType } from '../../utility/enums';
import IAction from './IAction';
import AppActionTypes from './types';

const setToastMessage = (type: ToastType) => (message: string, description?: string): IAction => ({
  type: AppActionTypes.SetToastMessage,
  payload: {
    message,
    description,
    type,
  }
});

export const setDangerToast = (message: string, description?: string): IAction => 
  setToastMessage(ToastType.Danger)(message, description);
  
export const setSuccessToast = (message: string, description?: string): IAction => 
  setToastMessage(ToastType.Success)(message, description);

export const applicationInitiated = (): IAction => ({
  type: AppActionTypes.AppInitiated,
})