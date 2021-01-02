import IState from '../IState';
import { IToastPayload } from './IAction';

export const getToast = (state: IState): IToastPayload | undefined  => state.app.toast;
export const isAppInitiated = (state: IState): boolean => state.app.initiated;