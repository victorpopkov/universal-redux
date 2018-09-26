import types from './types';

const notifyProgressShow = () => ({
  type: types.NOTIFY_PROGRESS_SHOW,
});

const notifyProgressHide = () => ({
  type: types.NOTIFY_PROGRESS_HIDE,
});

export default {
  notifyProgressShow,
  notifyProgressHide,
};
