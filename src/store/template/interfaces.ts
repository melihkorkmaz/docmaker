import TemplateModel from '../../models/TemplateModel';
import TemplateActionTypes from './types';

export interface IAction {
  type: TemplateActionTypes,
  payload?: string | TemplateModel,
}

export interface ITemplateState {
  templates?: [string],
  currentTemplate?: TemplateModel,
}