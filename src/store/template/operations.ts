import TemplateModel from '../../models/TemplateModel';

import { Dispatch } from 'redux';
import { appActions } from '../app';
import { userSelectors } from '../user';

import * as actions from './actions';

import IState from '../IState';

export const createTemplate = (template: TemplateModel) => async (dispatch: Dispatch, getState: () => IState) => {
  const state = getState();
  const user = userSelectors.getUser(state);
  // tslint:disable-next-line: no-non-null-assertion
  template.tenant = user?.tenant!;  
  
  try {
    await template.save();
    dispatch(actions.templateCreated(template));
  } catch (err) {
    dispatch(appActions.setDangerToast(err.message));
  }
};

export const getTemplate = (id: string) => async (dispatch: Dispatch) => {
  const template = new TemplateModel({ _id: id });
  
  try {
    await template.fetch();
    dispatch(actions.templateFetched(template));
  } catch (err) {
    dispatch(appActions.setDangerToast(err.message))    
  }

};

export const updateTemplate = (template: TemplateModel) => async (dispatch: Dispatch) => {
  
  try {
    await template.save();
    dispatch(actions.templateUpdated(template));
    dispatch(appActions.setSuccessToast('Done', 'The template has been saved successfully.'));
  } catch (err) {
    dispatch(appActions.setDangerToast(err.message))
  }
};

export const getTemplates = () => async (dispatch: Dispatch, getState: () => IState) => {
  const tenant = userSelectors.getTenant(getState());

  try {
    if (!tenant) {
      throw new Error('Tenant is empty!');
    }

    const res = await tenant.getTenantTemplates();
    dispatch(actions.templatesFetchSuccess(res));
  } catch (error) {
    dispatch(actions.templatesFetchFailed());
  }
}