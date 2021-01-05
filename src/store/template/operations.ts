import TemplateModel, { ITemplateModel } from '../../models/TemplateModel';

import { Dispatch } from 'redux';
import { appActions } from '../app';
import { userSelectors } from '../user';

import * as actions from './actions';

import IState from '../IState';


export const createTemplate = (templateFormData: ITemplateModel) => async (dispatch: Dispatch, getState: () => IState) => {
  const state = getState();
  const user = userSelectors.getUser(state);
  // tslint:disable-next-line: no-non-null-assertion
  templateFormData.tenant = user?.tenant!;
  
  const template = new TemplateModel(templateFormData);
  const response = await template.save();
  
  response.status ? 
    dispatch(actions.templateCreated()) : dispatch(appActions.setDangerToast(response.error));
};