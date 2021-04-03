import { showLoading, hideLoading } from 'react-redux-loading-bar';
import actions from './actions';

const notifyProgressShow = () => (dispatch) => {
  if (__CLIENT__) dispatch(showLoading());
  dispatch(actions.notifyProgressShow);
};

const notifyProgressHide = () => (dispatch) => {
  if (__CLIENT__) dispatch(hideLoading());
  dispatch(actions.notifyProgressHide());
};

export default {
  notifyProgressShow,
  notifyProgressHide,
};
