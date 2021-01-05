import TemplateActionTypes from './types';

export interface IAction {
  type: TemplateActionTypes,
  payload?: string,
}

export interface ITemplateState {
  templates?: [string]
}