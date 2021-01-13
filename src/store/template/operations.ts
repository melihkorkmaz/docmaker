import TemplateModel from '../../models/TemplateModel';

import { Dispatch } from 'redux';
import { appActions } from '../app';
import { userSelectors } from '../user';

import * as actions from './actions';

import IState from '../IState';

export const createTemplate = (templateFormData: TemplateModel) => async (dispatch: Dispatch, getState: () => IState) => {
  const state = getState();
  const user = userSelectors.getUser(state);
  // tslint:disable-next-line: no-non-null-assertion
  templateFormData.tenant = user?.tenant!;
  
  const template = new TemplateModel(templateFormData);
  const response = await template.save();
  
  response.status ? 
    dispatch(actions.templateCreated(template)) : dispatch(appActions.setDangerToast(response.error));
};

export const getTemplate = (id: string) => async (dispatch: Dispatch) => {
  const template = new TemplateModel({ _id: id });
  const response = await template.fetch();

  response.status ? 
    dispatch(actions.templateFetched(template)) : dispatch(appActions.setDangerToast(response.error));
};

export const updateTemplate = (template: TemplateModel) => async (dispatch: Dispatch) => {
  const response = await template.save();
  
  if (response.status) {
    dispatch(actions.templateUpdated(template));
    dispatch(appActions.setSuccessToast('Done', 'The template has been saved successfully.'));
  } else {
    dispatch(appActions.setDangerToast(response.error))
  }
};