import { fromJS } from 'immutable';
import event from './event/reducers';
import markdown from './markdown/duck/reducers';

// eslint-disable-next-line default-param-last
const entities = (state = fromJS({}), action) => {
  if (action.result && action.result.entities) {
    return state.mergeDeep(action.result.entities);
  }

  return state;
};

export { entities, event, markdown };
