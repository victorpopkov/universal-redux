# universal-redux

[![dependencies Status](https://david-dm.org/victorpopkov/universal-redux/status.svg)](https://david-dm.org/victorpopkov/universal-redux)
[![devDependencies Status](https://david-dm.org/victorpopkov/universal-redux/dev-status.svg)](https://david-dm.org/victorpopkov/universal-redux?type=dev)

Universal [React](https://github.com/facebook/react) and
[Redux](https://github.com/reactjs/react-redux) web app boilerplate bundled with
[webpack](https://github.com/webpack/webpack). As a CSS framework, Bootstrap 4
is used with all components provided by [Reactstrap](https://github.com/reactstrap/reactstrap)
and bundled using [bootstrap-loader](https://github.com/shakacode/bootstrap-loader).

- [Features](#features)
- [Running](#running)
  - [Development](#development)
  - [Production](#production)
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
3. Add .env
4. Launch: `yarn dev`
5. Visit in your browser (by default: [http://localhost:3000](http://localhost:3000))

### Production

In order to launch the production version you will need to build the project
first before actually starting it:

1. Clone the repository:
`git@github.com:victorpopkov/universal-redux.git`
2. Install packages: `yarn install`
3. Add .env
4. Build: `yarn build`
5. Launch: `yarn start`
6. Visit in your browser (by default: [http://localhost:8080](http://localhost:8080))

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
