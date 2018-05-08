// import Cookies from 'universal-cookie';
import axios from 'axios';
import { camelizeKeys } from 'humps';
import { normalize } from 'normalizr';
import config from '@Config'; // eslint-disable-line sort-imports

const methods = ['get', 'post', 'put', 'patch', 'del'];

function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? `/${path}` : path;

  if (__SERVER__) {
    // Prepend host and port of the API server to the path.
    return `${config.apiSchema}://${config.apiHost}:${config.apiPort + config.apiPrefix + adjustedPath}`;
  }

  // Prepend `/api` to relative URL, to proxy to API server.
  return `/api${adjustedPath}`;
}

export default class ApiClient {
  // eslint-disable-next-line no-unused-vars
  constructor(req) {
    // const cookies = (req && req.universalCookies) || new Cookies();

    methods.forEach(method => ( // eslint-disable-line no-return-assign
      this[method] = (path, {
        params,
        data,
        // files,
        schema,
        cancelToken,
      } = {}) => new Promise((resolve, reject) => {
        const request = {
          method,
          url: formatUrl(path),
          params,
          data,
          cancelToken,
        };

        // TODO: Implement files upload using axios
        // if (files && files.files && files.files.length > 0) {
        //   files.files.forEach((f) => {
        //     request.attach(files.name || f.name, f);
        //   });
        // }

        axios.request(request)
          .then((response) => {
            const camelized = camelizeKeys(response.data);

            resolve((schema) ? normalize(camelized, schema) : camelized);
          })
          .catch((error) => {
            if (!axios.isCancel(error)) {
              if (error.response) {
                reject(camelizeKeys(error.response.data) || error.response);
              } else {
                reject(error);
              }
            }
          });
      })
    ));
  }
}
