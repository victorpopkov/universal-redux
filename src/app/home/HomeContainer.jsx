import { Button, Col, Container, Row } from 'reactstrap';
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Markdown from 'react-markdown';
import Prism from 'prismjs';
import PropTypes from 'prop-types';
import { asyncConnect } from 'redux-connect';
import classNames from 'classnames';
import gfm from 'remark-gfm';
import * as duckMarkdown from '../markdown/duck/index';
import { Jumbotron, Sidebar } from '../common';
import styles from './HomeContainer.scss';

@asyncConnect(
  [
    {
      promise: ({ store: { dispatch, getState } }) => {
        if (!duckMarkdown.duckSelectors.isMarkdownLoaded(getState())) {
          return dispatch(duckMarkdown.duckOperations.loadMarkdown());
        }

        return Promise.resolve();
      },
    },
  ],
  (state) => ({
    markdown: state.get('markdown'),
  }),
  {
    loadMarkdown: duckMarkdown.duckOperations.loadMarkdown,
  },
)
class HomeContainer extends Component {
  constructor(props) {
    super(props);

    this.reloadMarkdown = this.reloadMarkdown.bind(this);
  }

  componentDidUpdate() {
    Prism.highlightAll();
  }

  markdownHeading = (props) => {
    const { children, level } = props;

    if (level === 1) {
      return (
        <div
          className={classNames(styles.heading, 'd-flex', 'align-items-center')}
        >
          {React.createElement(`h${level}`, {}, children)}
          {this.renderReloadBtn()}
        </div>
      );
    }

    return React.createElement(`h${level}`, {}, children);
  };

  // eslint-disable-next-line class-methods-use-this
  markdownListItem = (props) => {
    let checkbox = null;
    let elementProps = {};

    if (props.checked !== null) {
      const { checked } = props;

      checkbox = React.createElement('input', {
        disabled: true,
        readOnly: true,
        type: 'checkbox',
        checked,
      });

      elementProps = {
        className: styles['task-list-item'],
      };
    }

    return React.createElement('li', elementProps, checkbox, props.children);
  };

  // eslint-disable-next-line class-methods-use-this
  markdownParagraph = (props) => {
    const { children } = props;

    if (children.length === 7 && children[0].type === 'a') {
      return null;
    }

    return React.createElement('p', {}, children);
  };

  // eslint-disable-next-line class-methods-use-this
  markdownTable = (props) => {
    const { children } = props;

    return (
      <div className="table-responsive">
        {React.createElement('table', {}, children)}
      </div>
    );
  };

  reloadMarkdown() {
    const { loadMarkdown } = this.props;

    return loadMarkdown();
  }

  renderReloadBtn() {
    const { markdown } = this.props;

    if (markdown.get('loading')) {
      return (
        <Button color="secondary" size="sm" disabled outline>
          Loading...
        </Button>
      );
    }

    return (
      <Button color="secondary" size="sm" outline onClick={this.reloadMarkdown}>
        Reload
      </Button>
    );
  }

  renderMarkdown() {
    const { markdown } = this.props;

    if (markdown && markdown.get('loaded')) {
      return markdown.get('error') ? (
        <h2>{markdown.get('error')}</h2>
      ) : (
        <Markdown
          className={styles.markdown}
          components={{
            h1: this.markdownHeading,
            p: this.markdownParagraph,
            listItem: this.markdownListItem,
            table: this.markdownTable,
          }}
          plugins={[gfm]}
        >
          {markdown.get('content')}
        </Markdown>
      );
    }

    return <h5>Loading&hellip;</h5>;
  }

  render() {
    const {
      latestDevRevision,
      latestDevVersion,
      latestStableRevision,
      latestStableVersion,
    } = this.props;

    return (
      <main className={styles.home} role="main">
        <Helmet title="Universal web app boilerplate" />
        <Jumbotron
          latestDevRevision={latestDevRevision}
          latestDevVersion={latestDevVersion}
          latestStableRevision={latestStableRevision}
          latestStableVersion={latestStableVersion}
        />
        <Container>
          <Row>
            <Col lg={9}>{this.renderMarkdown()}</Col>
            <Sidebar />
          </Row>
        </Container>
      </main>
    );
  }
}

HomeContainer.propTypes = {
  latestDevRevision: PropTypes.string,
  latestDevVersion: PropTypes.string,
  latestStableRevision: PropTypes.string,
  latestStableVersion: PropTypes.string,
  loadMarkdown: PropTypes.func,
  markdown: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

HomeContainer.defaultProps = {
  latestDevRevision: null,
  latestDevVersion: null,
  latestStableRevision: null,
  latestStableVersion: null,
  loadMarkdown: null,
  markdown: null,
};

export default HomeContainer;
