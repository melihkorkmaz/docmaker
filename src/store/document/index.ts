import documentReducer from './reducer';

export type { IAction, IDocumentState } from './interfaces';
export {default as TemplateActionTypes} from './types';
export * as documentOperations from "./operations";
// export * as documentSelectors from './selectors';

export default documentReducer;