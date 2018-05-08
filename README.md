# isomorphic-redux-reactstrap

Isomorphic web app boilerplate built using [React](https://github.com/facebook/react)
and [Redux](https://github.com/reactjs/react-redux) in its core and bundled with
[webpack](https://github.com/webpack/webpack). As a CSS framework, Bootstrap 4
is used with all components provided by [Reactstrap](https://github.com/reactstrap/reactstrap)
and bundled using [bootstrap-loader](https://github.com/shakacode/bootstrap-loader).

## Features

-   [React Router v4](https://github.com/ReactTraining/react-router)
-   Based on the File-Type First (FTF) pattern
-   CSS Modules awesomeness using [babel-plugin-react-css-modules](https://github.com/gajus/babel-plugin-react-css-modules)
-   Fully pre-configured [Bootstrap 4](https://getbootstrap.com/) ready to be
used alongside with React
-   Hot Module Replacement (HMR) where possible
-   Inline any SVG as a React component using [babel-plugin-inline-react-svg](https://github.com/kesne/babel-plugin-inline-react-svg)
-   Possibility to build API to serve your own test data during development
-   Proxy between your API and the web app
-   Redux actions use [axios](https://github.com/axios/axios) for requests with
requests cancellation support
-   Redux related stuff is built with [Immutable.js](https://facebook.github.io/immutable-js/)
in mind

## Running

### Development

To start coding you just need to:

1.  Clone the repository: `git@github.com:victorpopkov/isomorphic-redux-reactstrap.git`
2.  Install packages: `yarn install` or `npm install`
3.  Launch: `yarn dev` or `npm dev`
4.  Visit in your browser: [http://localhost:3000](http://localhost:3000)

### Production

In order to launch the production version you will need to build the project
first before actually starting it:

1.  Clone the repository: `git@github.com:victorpopkov/isomorphic-redux-reactstrap.git`
2.  Install packages: `yarn install` or `npm install`
3.  Build: `yarn build` or `npm build`
3.  Launch: `yarn start` or `npm start`
4.  Visit in your browser: [http://localhost:3000](http://localhost:3000)

## Directory structure

```bash
.
├── api/                         
├── bin/
│   ├── api.js
│   └── server.js
├── build/ # build produced by webpack for production
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
│   ├── config.js # configs layer between our app and package.json
│   ├── routes.js
│   └── server.js
├── webpack/ # webpack related configs
│   ├── babel-loader.config.js        # prepare .babelrc configs to be consumed by babel-loader
│   ├── dev.config.js                 # `yarn dev` (configs for development)
│   ├── prod.config.js                # `yarn start` (configs for production)
│   ├── webpack-webpack-dev-server.js # `yarn watch-client` (development server with HMR)
│   └── webpack-isomorphic-tools.js   # configs to enable basic SSR for assets
├── postcss.config.js
└── server.babel.js
```

## License

Released under the [MIT License](https://opensource.org/licenses/MIT).
