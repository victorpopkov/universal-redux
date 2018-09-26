import {
  immutableReducer as reduxAsyncConnect,
  setToImmutableStateFunc,
  setToMutableStateFunc,
} from 'redux-connect';
import { LOCATION_CHANGE } from 'react-router-redux';
import { combineReducers } from 'redux-immutablejs';
import { fromJS } from 'immutable';
import * as appReducers from './app/reducers'; // eslint-disable-line sort-imports

const initialState = fromJS({ locationBeforeTransitions: null });

// Set the mutability/immutability functions
setToImmutableStateFunc(mutableState => fromJS(mutableState));
setToMutableStateFunc(immutableState => immutableState.toJS());

const routing = (state = initialState, action) => ((action.type === LOCATION_CHANGE)
  ? state.set('locationBeforeTransitions', action.payload)
  : state);

export default combineReducers({
  reduxAsyncConnect,
  routing,
  ...appReducers,
});
