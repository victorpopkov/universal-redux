# isomorphic-redux-reactstrap

[![dependencies Status](https://david-dm.org/victorpopkov/isomorphic-redux-reactstrap/status.svg)](https://david-dm.org/victorpopkov/isomorphic-redux-reactstrap)
[![devDependencies Status](https://david-dm.org/victorpopkov/isomorphic-redux-reactstrap/dev-status.svg)](https://david-dm.org/victorpopkov/isomorphic-redux-reactstrap?type=dev)

Isomorphic web app boilerplate built using [React](https://github.com/facebook/react)
and [Redux](https://github.com/reactjs/react-redux) in its core and bundled with
[webpack](https://github.com/webpack/webpack). As a CSS framework, Bootstrap 4
is used with all components provided by [Reactstrap](https://github.com/reactstrap/reactstrap)
and bundled using [bootstrap-loader](https://github.com/shakacode/bootstrap-loader).

- [Features](#features)
- [Running](#running)
  - [Development](#development)
  - [Production](#production)
- [Directory structure](#directory-structure)

## Features

- API with proxy
- Based on the File-Type First (FTF) pattern
- CSS Modules awesomeness using [babel-plugin-react-css-modules](https://github.com/gajus/babel-plugin-react-css-modules)
- Fully isomorphic ([universal-webpack](https://github.com/catamphetamine/universal-webpack))
- Fully pre-configured [Bootstrap 4](https://getbootstrap.com/) with [Reactstrap](https://reactstrap.github.io)
- Hot Module Replacement (HMR)
- Inline any SVG as a React component using [babel-plugin-inline-react-svg](https://github.com/kesne/babel-plugin-inline-react-svg)
- Loads environment variables from .env ([dotenv](https://github.com/motdotla/dotenv))
- React Router v4 ([react-router](https://github.com/ReactTraining/react-router))
- Redux actions use [axios](https://github.com/axios/axios) for requests with
requests cancellation support
- Redux related stuff is built with [Immutable.js](https://facebook.github.io/immutable-js/)
in mind

## Running

### Development

To start coding you just need to:

1. Clone the repository:
`git@github.com:victorpopkov/isomorphic-redux-reactstrap.git`
2. Install packages: `yarn install`
3. Add .env
4. Launch: `yarn dev`
5. Visit in your browser (by default: [http://localhost:3000](http://localhost:3000)).

### Production

In order to launch the production version you will need to build the project
first before actually starting it:

1. Clone the repository:
`git@github.com:victorpopkov/isomorphic-redux-reactstrap.git`
2. Install packages: `yarn install`
3. Add .env
4. Build: `yarn build`
5. Launch: `yarn start`
6. Visit in your browser (by default: [http://localhost:8080](http://localhost:8080)).

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
│   ├── assets/ # global assets
│   │   ├── images/
│   │   └── scss/
│   ├── components/ # React components (plain components that are not aware of state)
│   ├── containers/ # React containers (components that interact with state)
│   ├── helpers/
│   │   ├── ApiClient.js # helper to use `axios` library
│   │   └── Html.js      # helper for HTML Server-Side Rendering (SSR)
│   ├── redux/ # Redux related stuff using File-Type First (FTF) pattern
│   │   ├── actions/     # all our Redux actions
│   │   ├── constants/   # all our Redux constants
│   │   ├── events/      # all our events for `redux-notify` middleware
│   │   ├── middlewares/ # all our Redux middlewares
│   │   │   └── client.js # our tiny client middleware
│   │   ├── reducers/    # all Redux reducers
│   │   └── stores/      # all our Redux stores
│   ├── client.js
│   ├── routes.js
│   └── server.js
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
