import types from './types';

export function loadMarkdown() {
  return {
    types: [
      types.LOAD_MARKDOWN,
      types.LOAD_MARKDOWN_SUCCESS,
      types.LOAD_MARKDOWN_FAIL,
    ],
    promise: client => client.get('/markdown.json'),
  };
}

export default {
  loadMarkdown,
};
