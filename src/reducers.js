import {
  immutableReducer,
  setToImmutableStateFunc,
  setToMutableStateFunc,
} from 'redux-connect';
import { combineReducers } from 'redux-immutablejs';
import { connectRouter } from 'connected-react-router/immutable';
import { fromJS } from 'immutable';
import { loadingBarReducer } from 'react-redux-loading-bar';
import * as appReducers from './app/reducers'; // eslint-disable-line sort-imports

// Set the mutability/immutability functions
setToImmutableStateFunc((mutableState) => fromJS(mutableState));
setToMutableStateFunc((immutableState) => immutableState.toJS());

export default (history) =>
  combineReducers({
    loadingBar: loadingBarReducer,
    reduxAsyncConnect: immutableReducer,
    router: connectRouter(history),
    ...appReducers,
  });
