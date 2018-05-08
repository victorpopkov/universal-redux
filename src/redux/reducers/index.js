import {
  immutableReducer as reduxAsyncConnect,
  setToImmutableStateFunc,
  setToMutableStateFunc,
} from 'redux-connect';
import { LOCATION_CHANGE } from 'react-router-redux';
import { combineReducers } from 'redux-immutablejs';
import { fromJS } from 'immutable';
import eventsReducer from './events'; // eslint-disable-line sort-imports
import markdownReducer from './markdown';

const initialState = fromJS({
  locationBeforeTransitions: null,
});

// Set the mutability/immutability functions
setToImmutableStateFunc(mutableState => fromJS(mutableState));
setToMutableStateFunc(immutableState => immutableState.toJS());

const routerReducer = (state = initialState, action) => {
  if (action.type === LOCATION_CHANGE) {
    return state.set('locationBeforeTransitions', action.payload);
  }

  return state;
};

const entities = (state = fromJS({
}), action) => {
  if (action.result && action.result.entities) {
    return state.mergeDeep(action.result.entities);
  }

  return state;
};

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  entities,
  events: eventsReducer,
  markdown: markdownReducer,
});
