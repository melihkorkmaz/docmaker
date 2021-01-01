import IState from '../IState';

export const isAuthenticated = (state: IState): boolean => state.user.isAuthenticated;