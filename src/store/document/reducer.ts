import DocumentModel from '../../models/DocumentModel';
import { IAction, IDocumentState } from './interfaces';
import DocumentActionTypes from './types';


const documentReducer = (state: IDocumentState = {}, action: IAction): IDocumentState => {
  switch (action.type) {
    case DocumentActionTypes.CreateDocumentSuccess:
      return {
        ...state,
        currentDocument: action.payload as DocumentModel,
      };
    default:
      return state;
  }
};

export default documentReducer;