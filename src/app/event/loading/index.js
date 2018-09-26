import * as duck from '../../markdown/duck';
import * as duckEvent from './duck';

export default [
  {
    catch: [
      duck.duckTypes.LOAD_MARKDOWN,
    ],
    dispatch: [duckEvent.duckOperations.notifyProgressShow],
  },
  {
    catch: [
      duck.duckTypes.LOAD_MARKDOWN_FAIL,
      duck.duckTypes.LOAD_MARKDOWN_SUCCESS,
    ],
    dispatch: [duckEvent.duckOperations.notifyProgressHide],
  },
];
