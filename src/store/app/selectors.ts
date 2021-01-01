import IState from '../IState';
import { IErrorPayload } from './IAction';

export const getError = (state: IState): IErrorPayload | undefined  => state.app.error;
export const isAppInitiated = (state: IState): boolean => state.app.initiated;