import DocumentModel from '../../models/DocumentModel';
import DocumentActionTypes from './types';

export interface IAction {
  type: DocumentActionTypes,
  payload?: DocumentModel,
}

export interface IDocumentState {
  all?: DocumentModel[],
  currentDocument?: DocumentModel,
}