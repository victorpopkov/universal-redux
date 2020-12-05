import Cookies from 'universal-cookie';
import axios from 'axios';
import { camelizeKeys } from 'humps';
import { normalize } from 'normalizr';
import config from '@Config';

export default class ApiClient {
  static methods = ['get', 'post', 'put', 'patch', 'del'];

  formatUrl = (path) => {
    const adjustedPath = path[0] !== '/' ? `/${path}` : path;

    if (config.appApiProxyDisabled || __SERVER__) {
      return `${config.appApiTarget + adjustedPath}`;
    }

    return `${config.appBasePath + config.appApiProxyPath + adjustedPath}`;
  };

  constructor(req) {
    const cookies = (req && req.universalCookies) || new Cookies();

    ApiClient.methods.forEach(
      // eslint-disable-next-line no-return-assign
      (
        method, // eslint-disable-line no-return-assign
      ) =>
        (this[method] = (
          path,
          { params, data, files, schema, cancelToken } = {},
        ) =>
          new Promise((resolve, reject) => {
            let request = {
              method,
              url: this.formatUrl(path),
              params,
              data,
              cancelToken,
            };

            const token = cookies.get('token');

            if (token) {
              request = {
                ...request,
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              };
            }

            if (files && files.files && files.files.length > 0) {
              const formData = new FormData();
              files.files.forEach((f) => {
                formData.append(files.name || f.name, f);
              });

              axios
                .post(request.url, formData, {
                  headers: {
                    ...request.headers,
                    'Content-Type': 'multipart/form-data',
                  },
                })
                .then((response) => {
                  if (token && response.status === 401) {
                    cookies.remove('token');
                  }

                  const camelized = camelizeKeys(response.data);
                  resolve(schema ? normalize(camelized, schema) : camelized);
                })
                .catch((error) => {
                  if (!axios.isCancel(error)) {
                    if (error.response) {
                      reject(
                        camelizeKeys(error.response.data) || error.response,
                      );
                    } else {
                      reject(error);
                    }
                  }
                });

              return;
            }

            axios
              .request(request)
              .then((response) => {
                if (token && response.status === 401) {
                  cookies.remove('token');
                }

                const camelized = camelizeKeys(response.data);
                resolve(schema ? normalize(camelized, schema) : camelized);
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
          })),
    );
  }
}
