import React, { Component } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import renderRoutes from 'react-router-config/renderRoutes';
import { Footer, Navbar, Progress } from '@Components'; // eslint-disable-line sort-imports
import config from '@Config';

// eslint-disable-next-line react/prefer-stateless-function
export default class App extends Component {
  static propTypes = {
    route: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  };

  render() {
    const { route: { routes } } = this.props;

    return (
      <div>
        <Helmet {...config.app.head} />
        <Progress />
        <Navbar />
        {renderRoutes(routes)}
        <Footer />
      </div>
    );
  }
}
