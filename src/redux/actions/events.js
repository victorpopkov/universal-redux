import Progress from 'react-progress-2';
import { NOTIFY_PROGRESS_HIDE, NOTIFY_PROGRESS_SHOW } from '@ReduxConstants/events'; // eslint-disable-line sort-imports

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
