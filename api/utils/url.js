export default (availableActions = {}, urlParts = []) => {
  const notFound = { action: null, params: [] };
  let urlPartsMod = urlParts;

  // remove '.json' from last URL part
  urlPartsMod[urlPartsMod.length - 1] = urlPartsMod[urlPartsMod.length - 1].replace(/\.json$/, '');

  // test for empty input
  if (urlParts.length === 0 || Object.keys(availableActions).length === 0) {
    return notFound;
  }

  // when only one URL parameter
  if (urlParts.length === 1) {
    urlPartsMod[0] = `${urlParts[0]}Index`;
  } else {
    urlPartsMod = urlParts;
  }

  const reducer = (prev, current) => {
    if (prev.action && prev.action[current]) {
      return { action: prev.action[current], params: [] };
    }

    if (typeof prev.action === 'function') {
      return { action: prev.action, params: prev.params.concat(current) };
    }

    return notFound;
  };

  const actionAndParams = urlPartsMod.reduce(reducer, { action: availableActions, params: [] });

  return (typeof actionAndParams.action === 'function') ? actionAndParams : notFound;
};
