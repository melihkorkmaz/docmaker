import templateReducer from './reducer';

export type { IAction, ITemplateState } from './interfaces';
export {default as TemplateActionTypes} from './types';
export * as templateOperations from "./operations";
export * as templateSelectors from './selectors';

export default templateReducer;