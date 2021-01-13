import { IAppState } from './app';
import { ITemplateState } from './template';
import { userInterfaces } from './user';

export default interface IState {
  user: userInterfaces.IUserState;
  app: IAppState;
  template: ITemplateState
}