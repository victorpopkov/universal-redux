import { createReducer } from 'redux-immutablejs';
import { fromJS } from 'immutable';
import types from './types';

export default createReducer(fromJS({
  loading: false,
  loaded: false,
  content: null,
  error: null,
}), {
  [types.LOAD_MARKDOWN]: state => state.merge({
    loading: true,
    error: null,
  }),
  [types.LOAD_MARKDOWN_SUCCESS]: (state, action) => state.merge({
    loading: false,
    loaded: true,
    content: action.result.content,
    error: null,
  }),
  [types.LOAD_MARKDOWN_FAIL]: (state, action) => state.merge({
    loading: false,
    loaded: true,
    content: null,
    error: action.error.message,
  }),
});
