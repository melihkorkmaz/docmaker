import TemplateModel from '../../models/TemplateModel';
import IState from '../IState';

export const getCurrentTemplate = (state: IState) => state.template.currentTemplate;
export const getTemplates = (state: IState): TemplateModel[] | undefined => {
  if (!state.template.all) {
    return;
  }

  return state.template.all.map(data => new TemplateModel(data));
};