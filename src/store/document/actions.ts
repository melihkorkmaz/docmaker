import DocumentModel from "../../models/DocumentModel";

import { IAction } from './interfaces';
import DocumentActionTypes from "./types";

export const documentCreated = (document: DocumentModel): IAction => ({
  type: DocumentActionTypes.CreateDocumentSuccess,
  payload: document
});