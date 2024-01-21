import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { ImmutableLoadingBar as LoadingBar } from 'react-redux-loading-bar';
import PropTypes from 'prop-types';
import axios from 'axios';
import { renderRoutes } from 'react-router-config';
import config from '@Config';
import { Footer, Navbar } from './common';

class App extends Component {
  componentDidMount() {
    this.latestDevRevision = null;
    this.latestDevVersion = null;
    this.latestStableRevision = null;
    this.latestStableVersion = null;

    const api = axios.create({
      baseURL: `https://api.github.com/repos/${config.package.githubRef}`,
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    });

    api.get(`/contents/package.json`).then((res) => {
      if (res.data.encoding === null) {
        return;
      }

      switch (res.data.encoding) {
        case 'json':
          this.latestDevVersion = res.data.version;
          this.forceUpdate();
          break;
        case 'base64':
          this.latestDevVersion = JSON.parse(atob(res.data.content)).version;
          this.forceUpdate();
          break;
        default:
      }
    });

    api.get(`/commits`).then((res) => {
      this.latestDevRevision = res.data[0].sha;
      this.forceUpdate();
    });

    api.get(`/tags`).then((res) => {
      let tag = null;

      if (res.data.length > 0) {
        res.data.forEach((data) => {
          if (tag === null && data.name.match(/^v/)) {
            tag = data;
          }
        });
      }

      if (tag !== null) {
        this.latestStableVersion = tag.name.replace(/^v/, '');
        this.latestStableRevision = tag.commit.sha;
        this.forceUpdate();
      }
    });
  }

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
        {renderRoutes(routes, {
          latestDevRevision: this.latestDevRevision,
          latestDevVersion: this.latestDevVersion,
          latestStableRevision: this.latestStableRevision,
          latestStableVersion: this.latestStableVersion,
        })}
        <Footer repository={config.package.repository} />
      </div>
    );
  }
}

App.propTypes = {
  route: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};

export default App;
