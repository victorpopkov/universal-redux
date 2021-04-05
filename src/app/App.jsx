import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { ImmutableLoadingBar as LoadingBar } from 'react-redux-loading-bar';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader'; // eslint-disable-line import/no-extraneous-dependencies
import { renderRoutes } from 'react-router-config';
import { Footer, Navbar } from './common'; // eslint-disable-line sort-imports
import config from '../../config';

@hot(module)
// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  render() {
    const {
      route: { routes },
    } = this.props;
    const { link, meta, titleTemplate } = config.app.head;

    return (
      <div className="app">
        <Helmet link={link} meta={meta} titleTemplate={titleTemplate}>
          <script async defer src="https://buttons.github.io/buttons.js" />
        </Helmet>
        <LoadingBar className="loading" />
        <Navbar />
        {renderRoutes(routes)}
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  route: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};

export default App;
