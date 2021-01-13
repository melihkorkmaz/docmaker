import TemplateModel from '../../models/TemplateModel';
import { IAction, ITemplateState } from './interfaces';
import TemplateActionTypes from './types';


const templateReducer = (state: ITemplateState = {}, action: IAction): ITemplateState => {
  switch (action.type) {
    case TemplateActionTypes.TemplateFetched:
    case TemplateActionTypes.CreateTemplateSuccess:
    case TemplateActionTypes.UpdateTemplateSuccess:
      return {
        ...state,
        currentTemplate: action.payload as TemplateModel,
      };
    default:
      return state;
  }
};

export default templateReducer;