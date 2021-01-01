import { IAppState } from './app';
import { userInterfaces } from './user';

export default interface IState {
  user: userInterfaces.IUserState;
  app: IAppState;
}