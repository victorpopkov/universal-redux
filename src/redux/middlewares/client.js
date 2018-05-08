export default function clientMiddleware(client) {
  return () => next => (action) => { // { dispatch, getState }
    const { promise, types, ...rest } = action;

    // below is commented out as we use redux-thunk
    // if (typeof action === 'function') {
    //   return action(dispatch, getState, cookies);
    // }

    if (!promise) {
      return next(action);
    }

    const [REQUEST, SUCCESS, FAILURE] = types;
    next({ ...rest, type: REQUEST });

    const actionPromise = promise(client);
    actionPromise.then(
      result => next({ ...rest, result, type: SUCCESS }),
      error => next({ ...rest, error, type: FAILURE })
    ).catch((error) => {
      console.error('MIDDLEWARE ERROR:', error);
      next({ ...rest, error, type: FAILURE });
    });

    return actionPromise;
  };
}
