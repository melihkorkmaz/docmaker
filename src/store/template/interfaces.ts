import TemplateModel from '../../models/TemplateModel';
import TemplateActionTypes from './types';

export interface IAction {
  type: TemplateActionTypes,
  payload?: string | TemplateModel | TemplateModel[],
}

export interface ITemplateState {
  all?: TemplateModel[],
  currentTemplate?: TemplateModel,
}