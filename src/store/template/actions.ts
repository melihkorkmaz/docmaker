import TemplateModel from '../../models/TemplateModel';
import {IAction} from './interfaces';
import TemplateActionTypes from './types';

export const templateCreated = (template: TemplateModel): IAction => ({
  type: TemplateActionTypes.CreateTemplateSuccess,
  payload: template,
});

export const templateUpdated = (template: TemplateModel): IAction => ({
  type: TemplateActionTypes.UpdateTemplateSuccess,
  payload: template,
});

export const templateFetched = (template: TemplateModel): IAction => ({
  type: TemplateActionTypes.TemplateFetched,
  payload: template
});

export const templatesFetchFailed = (): IAction => ({
  type: TemplateActionTypes.TemplatesFetchFailed
});

export const templatesFetchSuccess = (templates: TemplateModel[]): IAction => ({
  type: TemplateActionTypes.TemplatesFetchSuccess,
  payload: templates
});