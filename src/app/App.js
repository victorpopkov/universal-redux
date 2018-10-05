import React, { Component } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import renderRoutes from 'react-router-config/renderRoutes';
import { Footer, Navbar, Progress } from './common'; // eslint-disable-line sort-imports
import config from '@Config';

@hot(module)
// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
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

export default App;
