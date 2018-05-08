import Progress from 'react-progress-2';
// eslint-disable-next-line sort-imports
import {
  NOTIFY_PROGRESS_HIDE,
  NOTIFY_PROGRESS_SHOW,
  NOTIFY_SUBMISSION_ERROR,
  NOTIFY_TOP_CENTER_ERROR,
  NOTIFY_TOP_CENTER_SUCCESS,
} from '@ReduxConstants/events';

export function notifySubmissionError(caller) {
  return {
    type: NOTIFY_SUBMISSION_ERROR,
    error: caller.error,
    caller,
  };
}

export function notifyTopCenterError(caller) {
  return {
    type: NOTIFY_TOP_CENTER_ERROR,
    error: caller.error,
    caller,
  };
}

export function notifyTopCenterSuccess(caller) {
  return {
    type: NOTIFY_TOP_CENTER_SUCCESS,
    success: caller.success,
    caller,
  };
}

export function notifyProgressShow(caller) {
  if (__CLIENT__) {
    Progress.show();
  }

  return {
    type: NOTIFY_PROGRESS_SHOW,
    caller,
  };
}

export function notifyProgressHide(caller) {
  if (__CLIENT__) {
    Progress.hide();
  }

  return {
    type: NOTIFY_PROGRESS_HIDE,
    caller,
  };
}
