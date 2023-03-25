# universal-redux

[![CI]](https://github.com/victorpopkov/universal-redux/actions/workflows/ci.yml)
[![CD]](https://github.com/victorpopkov/universal-redux/actions/workflows/cd.yml)
[![Code Climate]](https://codeclimate.com/github/victorpopkov/universal-redux)
[![Libraries.io]](https://libraries.io/github/victorpopkov/universal-redux)

Universal [React] and [Redux] web app boilerplate bundled with [webpack]. As a
CSS framework, [Bootstrap 5] is used with all components provided by
[Reactstrap].

- [Features](#features)
- [Running](#running)
  - [Development](#development)
  - [Production](#production)
- [Configurations](#configurations)
  - [Environment variables](#environment-variables)
- [Directory structure](#directory-structure)

## Features

- [x] Based on the [Ducks] pattern
- [x] Fully isomorphic ([universal-webpack])
- [x] Fully pre-configured [Bootstrap 5] with [Reactstrap]
- [x] Hot Module Replacement (HMR)
- [x] Inline SVGs as React components ([babel-plugin-inline-react-svg])
- [x] React Router v4 ([react-router])
- [x] Redux actions use [axios] for requests with requests cancellation support
- [x] Redux related stuff is built with [Immutable.js] in mind
- [x] Serve API directly or using proxy

## Running

### Development

To start coding you just need to:

1. Clone the repository: `https://github.com/victorpopkov/universal-redux.git`
2. Install packages: `yarn install`
3. Export `.env.dev` environment variables
4. Launch: `yarn dev`
5. Visit in your browser (default: http://localhost:3000)

### Production

In order to launch the production version you will need to build the project
first before actually starting it:

1. Clone the repository: `https://github.com/victorpopkov/universal-redux.git`
2. Install packages: `yarn install`
3. Export `.env.prod` environment variables
4. Build: `yarn build`
5. Launch: `yarn start`
6. Visit in your browser (default: http://localhost:8080)

## Configurations

All app-specific configurations can be found in the `/config` root directory,
and most are just the environment variables.

### Environment variables

| Environment variable     | Default                 | Description                                                                                                                                                                     |
| ------------------------ | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `APP_API_PORT`           | `3030`                  |                                                                                                                                                                                 |
| `APP_API_PROXY_DISABLED` | `0`                     | Enable or disable API proxy. When the value is set to `1` all other `APP_API_PROXY_*` variables can be safely removed as the app will talk to the API directly.                 |
| `APP_API_PROXY_PATH`     | `/api`                  | _Only when `APP_API_PROXY_DISABLED` is enabled._                                                                                                                                |
| `APP_API_PROXY_TARGET`   | `http://localhost:3030` | API proxy target (**without a trailing slash**) used by the [http-proxy]. By default, it points to the current project API.<br>_Only when `APP_API_PROXY_DISABLED` is enabled._ |
| `APP_API_TARGET`         | `http://localhost:3030` | API target (**without a trailing slash**).<br>_Only when `APP_API_PROXY_DISABLED` is enabled._                                                                                  |
| `APP_BASE_PATH`          |                         | App base path (**without a trailing slash**).                                                                                                                                   |
| `APP_DEV_SERVER_PORT`    | `3001`                  | [webpack-dev-server] port.<br>_Only in development mode._                                                                                                                       |
| `APP_HOST`               | `0.0.0.0`               |                                                                                                                                                                                 |
| `APP_MORGAN_FORMAT`      | `combined`              | [Morgan] HTTP request logger middleware format.                                                                                                                                 |
| `APP_PORT`               | `3000`                  |                                                                                                                                                                                 |
| `APP_PUBLIC_PATH`        | `/`                     | App public path (**with a trailing slash**) to serve static assets and scripts.                                                                                                 |

## Directory structure

```bash
.
├── api/
├── bin/
│   ├── api.js
│   └── server.js
├── build/
├── config/
├── src/
│   ├── app/ # app source
│   ├── assets/ # global assets
│   │   ├── images/
│   │   └── scss/
│   ├── helpers/
│   │   ├── ApiClient.js # helper to use `axios` library
│   │   └── Html.jsx     # helper for HTML Server-Side Rendering (SSR)
│   ├── middlewares
│   │   └── client.js # our tiny client middleware
│   ├── store
│   │   ├── configureStore.js
│   │   └── dev-tools.js
│   ├── client.jsx
│   ├── reducers.js
│   ├── routes.js
│   └── server.jsx
├── webpack/ # webpack configs
│   └── webpack-dev-server.js           # development server with HMR configs
│   ├── dev.base.config.js              # base (development)
│   ├── dev.client.config.js            # universal-webpack client (development)
│   ├── dev.server.config.js            # universal-webpack server (development)
│   ├── paths.js
│   ├── prod.base.config.js             # base (production)
│   ├── prod.client.config.js           # universal-webpack client (production)
│   ├── prod.server.config.js           # universal-webpack server (production)
│   ├── universal-webpack-settings.json
└── webpack.base.config.js
```

## License

Released under the [MIT License](https://opensource.org/licenses/MIT).

[axios]: https://github.com/axios/axios
[babel-plugin-inline-react-svg]: https://github.com/airbnb/babel-plugin-inline-react-svg
[bootstrap 5]: https://getbootstrap.com/
[cd]: https://img.shields.io/github/actions/workflow/status/victorpopkov/universal-redux/cd.yml?branch=main&label=cd
[ci]: https://img.shields.io/github/actions/workflow/status/victorpopkov/universal-redux/ci.yml?branch=main&label=ci
[code climate]: https://img.shields.io/codeclimate/maintainability/victorpopkov/universal-redux
[ducks]: https://github.com/erikras/ducks-modular-redux
[http-proxy]: https://github.com/nodejitsu/node-http-proxy
[immutable.js]: https://immutable-js.com/
[libraries.io]: https://img.shields.io/librariesio/github/victorpopkov/universal-redux
[morgan]: https://github.com/expressjs/morgan
[react-router]: https://github.com/remix-run/react-router
[react]: https://github.com/facebook/react
[reactstrap]: https://reactstrap.github.io
[redux]: https://github.com/reactjs/react-redux
[universal-webpack]: https://github.com/catamphetamine/universal-webpack
[webpack-dev-server]: https://github.com/webpack/webpack-dev-server
[webpack]: https://github.com/webpack/webpack
