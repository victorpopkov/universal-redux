import {
  LOAD_MARKDOWN,
  LOAD_MARKDOWN_FAIL,
  LOAD_MARKDOWN_SUCCESS,
} from '@ReduxConstants/markdown';

export function isMarkdownLoaded(globalState) {
  return globalState.getIn(['markdown', 'loaded']);
}

export function loadMarkdown() {
  return {
    types: [
      LOAD_MARKDOWN,
      LOAD_MARKDOWN_SUCCESS,
      LOAD_MARKDOWN_FAIL,
    ],
    promise: client => client.get('/markdown.json'),
  };
}
