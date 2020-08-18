# universal-redux

[![David](https://img.shields.io/david/victorpopkov/universal-redux.svg)](https://david-dm.org/victorpopkov/universal-redux)
[![David](https://img.shields.io/david/dev/victorpopkov/universal-redux.svg)](https://david-dm.org/victorpopkov/universal-redux?type=dev)
[![Travis (.org)](https://img.shields.io/travis/victorpopkov/universal-redux.svg)](https://travis-ci.org/victorpopkov/universal-redux)

Universal [React](https://github.com/facebook/react) and
[Redux](https://github.com/reactjs/react-redux) web app boilerplate bundled with
[webpack](https://github.com/webpack/webpack). As a CSS framework, Bootstrap 4
is used with all components provided by [Reactstrap](https://github.com/reactstrap/reactstrap)
and bundled using [bootstrap-loader](https://github.com/shakacode/bootstrap-loader).

- [Features](#features)
- [Running](#running)
  - [Development](#development)
  - [Production](#production)
- [Configurations](#configurations)
  - [Environment variables](#environment-variables)
- [Directory structure](#directory-structure)

## Features

- [x] Based on the [Ducks](https://github.com/erikras/ducks-modular-redux)
pattern
- [x] Configurable through .env ([dotenv](https://github.com/motdotla/dotenv))
- [x] CSS Modules awesomeness using [babel-plugin-react-css-modules](https://github.com/gajus/babel-plugin-react-css-modules)
- [x] Fully isomorphic ([universal-webpack](https://github.com/catamphetamine/universal-webpack))
- [x] Fully pre-configured [Bootstrap 4](https://getbootstrap.com/) with [Reactstrap](https://reactstrap.github.io)
- [x] Hot Module Replacement (HMR)
- [x] Inline SVGs as React components ([babel-plugin-inline-react-svg](https://github.com/kesne/babel-plugin-inline-react-svg))
- [x] React Router v4 ([react-router](https://github.com/ReactTraining/react-router))
- [x] Redux actions use [axios](https://github.com/axios/axios) for requests
with requests cancellation support
- [x] Redux related stuff is built with [Immutable.js](https://facebook.github.io/immutable-js/)
in mind
- [x] Serve API directly or using proxy

## Running

### Development

To start coding you just need to:

1. Clone the repository:
`git@github.com:victorpopkov/universal-redux.git`
2. Install packages: `yarn install`
3. Rename `.env.dev` to `.env`
4. Launch: `yarn dev`
5. Visit in your browser (by default: [http://localhost:3000](http://localhost:3000))

### Production

In order to launch the production version you will need to build the project
first before actually starting it:

1. Clone the repository:
`git@github.com:victorpopkov/universal-redux.git`
2. Install packages: `yarn install`
3. Rename `.env.prod` to `.env`
4. Build: `yarn build`
5. Launch: `yarn start`
6. Visit in your browser (by default: [http://localhost:8080](http://localhost:8080))

## Configurations

All app-specific configurations can be found in the `/config` root directory.
Most of them are just the references to the environment variables which can be
both system-wide and `.env` specific (take into account that any values in the
`.env` will override the system-wide ones).

### Environment variables

| Environment variable     | Default value           | Description                                                                                                                                                                                                                                         |
|--------------------------|-------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `APP_API_PORT`           | `3030`                  | The API port.                                                                                                                                                                                                                                       |
| `APP_API_PROXY_DISABLED` | `0`                     | The API proxy is disabled or not. When the value is set to `1` all other `APP_API_PROXY_*` variables can be safely removed as the app will talk to the API directly.                                                                                |
| `APP_API_PROXY_PATH`     | `/api`                  | The API proxy path.                                                                                                                                                                                                                                 |
| `APP_API_PROXY_TARGET`   | `http://localhost:3030` | The API proxy target (**without a trailing slash**) used by the [http-proxy](https://github.com/nodejitsu/node-http-proxy). By default, it points to the current project API. *Change this value if you are using an external API through a proxy.* |
| `APP_API_TARGET`         | `http://localhost:3030` | The API target (**without a trailing slash**). *Change this value if you are using an external API.*                                                                                                                                                |
| `APP_BASE_PATH`          | `/`                     | The app base path (**without a trailing slash**).                                                                                                                                                                                                   |
| `APP_DEV_SERVER_PORT`    | `3001`                  | The [webpack-dev-server](https://github.com/webpack/webpack-dev-server) port.                                                                                                                                                                       |
| `APP_HOST`               | `0.0.0.0`               | The app host.                                                                                                                                                                                                                                       |
| `APP_PORT`               | `3000`                  | The app port.                                                                                                                                                                                                                                       |
| `APP_PUBLIC_PATH`        | `/`                     | The app public path (**with a trailing slash**) to serve static assets and scripts.                                                                                                                                                                 |

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
│   │   └── Html.js      # helper for HTML Server-Side Rendering (SSR)
│   ├── middlewares
│   │   └── client.js # our tiny client middleware
│   ├── client.js
│   ├── reducers.js
│   ├── routes.js
│   ├── server.js
│   └── store.js
├── webpack/ # webpack related configs
│   ├── paths.js
│   ├── universal-webpack-settings.json
│   ├── webpack.config.client.dev.babel.js  # universal-webpack client (development)
│   ├── webpack.config.client.prod.babel.js # universal-webpack client (production)
│   ├── webpack.config.common.js            # common for all environments
│   ├── webpack.config.dev.js               # development environment
│   ├── webpack.config.prod.js              # production environment
│   ├── webpack.config.server.dev.babel.js  # universal-webpack server (development)
│   ├── webpack.config.server.prod.babel.js # universal-webpack server (production)
│   └── webpack-dev-server.js               # development server with HMR configs
└── postcss.config.js
```

## License

Released under the [MIT License](https://opensource.org/licenses/MIT).
