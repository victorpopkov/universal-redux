import { createReducer } from 'redux-immutablejs';
import { fromJS } from 'immutable';
import types from './types';

export default createReducer(fromJS({
  shown: false,
}), {
  [types.NOTIFY_PROGRESS_SHOW]: state => state.merge({
    shown: true,
  }),
  [types.NOTIFY_PROGRESS_HIDE]: state => state.merge({
    shown: false,
  }),
});
