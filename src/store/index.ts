import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import appReducer from './app';
import templateReducer from './template';
import userReducer from './user';

const enhancers: [] = []
let composeEnhancers = compose

if (process.env.NODE_ENV === 'development') {
  //tslint:disable:no-any
	if (typeof (window as any ).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
    //tslint:disable:no-any
		composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
	}
}

const allReducers = combineReducers({
  user: userReducer,
  app: appReducer,
  template: templateReducer,
});

const store = createStore(allReducers, composeEnhancers(applyMiddleware(thunk), ...enhancers));
export default store;