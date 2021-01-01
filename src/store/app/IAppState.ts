import { IErrorPayload } from './IAction';

export default interface IAppState {
  initiated: boolean,
  error?: IErrorPayload
}