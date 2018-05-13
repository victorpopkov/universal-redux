import { combineReducers, createReducer } from 'redux-immutablejs';
import { fromJS } from 'immutable';
import { NOTIFY_PROGRESS_HIDE, NOTIFY_PROGRESS_SHOW } from '@ReduxConstants/events'; // eslint-disable-line sort-imports

const progress = createReducer(fromJS({}), {
  [NOTIFY_PROGRESS_SHOW]: state => state.merge({}),
  [NOTIFY_PROGRESS_HIDE]: state => state.merge({}),
});

export default combineReducers({
  progress,
});
