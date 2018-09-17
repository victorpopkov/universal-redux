import { createReducer } from 'redux-immutablejs';
import { fromJS } from 'immutable';
// eslint-disable-next-line sort-imports
import {
  LOAD_MARKDOWN,
  LOAD_MARKDOWN_FAIL,
  LOAD_MARKDOWN_SUCCESS,
} from '@ReduxConstants/markdown';

const markdown = createReducer(fromJS({
  loading: false,
  loaded: false,
  content: null,
  error: null,
}), {
  [LOAD_MARKDOWN]: state => state.merge({
    loading: true,
    error: null,
  }),
  [LOAD_MARKDOWN_SUCCESS]: (state, action) => state.merge({
    loading: false,
    loaded: true,
    content: action.result.content,
    error: null,
  }),
  [LOAD_MARKDOWN_FAIL]: (state, action) => state.merge({
    loading: false,
    loaded: true,
    content: null,
    error: action.error.message,
  }),
});

export default markdown;
