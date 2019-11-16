import Progress from 'react-progress-2';
import actions from './actions';

const notifyProgressShow = (caller) => (dispatch) => {
  if (__CLIENT__ && Progress && !caller.inBackground) Progress.show();
  dispatch(actions.notifyProgressShow);
};

const notifyProgressHide = (caller) => (dispatch) => {
  if (__CLIENT__ && Progress && !caller.inBackground) Progress.hide();
  dispatch(actions.notifyProgressHide());
};

export default {
  notifyProgressShow,
  notifyProgressHide,
};
