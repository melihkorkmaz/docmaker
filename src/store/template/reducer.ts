import { IAction, ITemplateState } from './interfaces';
import TemplateActionTypes from './types';


const templateReducer = (state: ITemplateState = {}, action: IAction): ITemplateState => {
  switch (action.type) {
    case TemplateActionTypes.CreateTemplateSuccess:
      return state;
    default:
      return state;
  }
};

export default templateReducer;