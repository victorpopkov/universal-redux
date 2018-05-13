import {
  immutableReducer as reduxAsyncConnect,
  setToImmutableStateFunc,
  setToMutableStateFunc,
} from 'redux-connect';
import { combineReducers } from 'redux-immutablejs';
import { fromJS } from 'immutable';
import { routerReducer } from 'react-router-redux';
import eventsReducer from './events'; // eslint-disable-line sort-imports
import markdownReducer from './markdown';

// Set the mutability/immutability functions
setToImmutableStateFunc(mutableState => fromJS(mutableState));
setToMutableStateFunc(immutableState => immutableState.toJS());

const entities = (state = fromJS({}), action) => {
  if (action.result && action.result.entities) {
    return state.mergeDeep(action.result.entities);
  }

  return state;
};

export default combineReducers({
  events: eventsReducer,
  markdown: markdownReducer,
  router: routerReducer,
  reduxAsyncConnect,
  entities,
});
