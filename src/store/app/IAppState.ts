import { IToastPayload } from './IAction';

export default interface IAppState {
  initiated: boolean,
  toast?: IToastPayload
}