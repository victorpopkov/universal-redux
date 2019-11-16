/**
 * Our custom client middleware.
 *
 * @param client
 * @returns {function(): function(*=): Function}
 */
export default client => () => next => (action) => { // { dispatch, getState }
  const { promise, types, ...rest } = action;

  // if (typeof action === 'function') {
  //   return action(dispatch, getState, cookies);
  // }

  if (!promise) {
    return next(action);
  }

  const [REQUEST, SUCCESS, FAILURE] = types;
  next({ ...rest, type: REQUEST });

  const actionPromise = promise(client);
  actionPromise
    .then(
      result => next({ ...rest, result, type: SUCCESS }),
      error => next({ ...rest, error, type: FAILURE }),
    )
    .catch((error) => {
      console.error('MIDDLEWARE ERROR:', error);
      next({ ...rest, error, type: FAILURE });
    });

  return actionPromise;
};
