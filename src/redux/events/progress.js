import { LOAD_MARKDOWN, LOAD_MARKDOWN_FAIL, LOAD_MARKDOWN_SUCCESS } from '@ReduxConstants/markdown';
import { notifyProgressHide, notifyProgressShow } from '@ReduxActions/events';

export default [
  {
    catch: [
      LOAD_MARKDOWN,
    ],
    dispatch: [notifyProgressShow],
  },
  {
    catch: [
      LOAD_MARKDOWN_SUCCESS,
      LOAD_MARKDOWN_FAIL,
    ],
    dispatch: [notifyProgressHide],
  },
];
