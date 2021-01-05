import {IAction} from './interfaces';
import TemplateActionTypes from './types';

export const templateCreated = (): IAction => ({
  type: TemplateActionTypes.CreateTemplateSuccess,
})