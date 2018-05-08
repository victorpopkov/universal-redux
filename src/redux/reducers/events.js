import { combineReducers, createReducer } from 'redux-immutablejs';
import React from 'react';
import { fromJS } from 'immutable';
// eslint-disable-next-line sort-imports
import {
  NOTIFY_PROGRESS_HIDE,
  NOTIFY_PROGRESS_SHOW,
  NOTIFY_SUBMISSION_ERROR,
  NOTIFY_TOP_CENTER_ERROR,
  NOTIFY_TOP_CENTER_SUCCESS,
} from '@ReduxConstants/events';

const notification = createReducer(fromJS({
  title: null,
  message: null,
  level: null,
  position: null,
}), {
  [NOTIFY_TOP_CENTER_ERROR]: (state, action) => state.merge({
    title: null,
    children: (
      <div className="notification-content">
        <span className="symbol error" />
        <span className="text">{action.error.error || 'Esines tundmatu viga.'}</span>
      </div>
    ),
    position: 'tc',
    level: 'error',
  }),
  [NOTIFY_SUBMISSION_ERROR]: (state, action) => {
    /* eslint-disable no-underscore-dangle */
    let error = null;
    if (action.error.errors && action.error.errors._error) {
      error = action.error.errors._error;
    }
    /* eslint-enable no-underscore-dangle */

    const msg = (typeof error === 'string' || error instanceof String)
      ? error
      : (error && error.msg);

    return state.merge({
      title: null,
      children: (
        <div className="notification-content">
          <span className="symbol error" />
          <span className="text">{msg || 'Esines tundmatu viga.'}</span>
        </div>
      ),
      position: 'tc',
      level: 'error',
    });
  },
  [NOTIFY_TOP_CENTER_SUCCESS]: (state, action) => state.merge({
    title: null,
    children: (
      <div className="notification-content">
        <span className="symbol success" />
        <span className="text">{action.success}</span>
      </div>
    ),
    position: 'tc',
    level: 'success',
  }),
});

const progress = createReducer(fromJS({}), {
  [NOTIFY_PROGRESS_SHOW]: state => state.merge({}),
  [NOTIFY_PROGRESS_HIDE]: state => state.merge({}),
});

export default combineReducers({
  notification,
  progress,
});
