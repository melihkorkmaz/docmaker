import { Dispatch } from "redux";
import DocumentModel from "../../models/DocumentModel";

import { appActions } from "../app";
import { userSelectors } from '../user';
import * as actions from './actions';

import IState from "../../store/IState";

export const createNewDocument = (document: DocumentModel) => async (dispatch: Dispatch, getState: () => IState) => {
  const state = getState();
  const user = userSelectors.getUser(state);

  // tslint:disable-next-line: no-non-null-assertion
  document.tenant = user?.tenant!;

  try {
    await document.save();
    dispatch(actions.documentCreated(document));
    dispatch(appActions.setSuccessToast('Success', 'Document has been created!'))
  } catch (err) {
    dispatch(appActions.setDangerToast(err.message));
  }
}