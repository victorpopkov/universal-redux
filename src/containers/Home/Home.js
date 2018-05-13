import {
  Button,
  Col,
  Container,
  Jumbotron,
  Row,
  UncontrolledTooltip,
} from 'reactstrap';
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Markdown from 'react-markdown';
import Prism from 'prismjs';
import PropTypes from 'prop-types';
import { asyncConnect } from 'redux-connect';
import 'prismjs/components/prism-bash'; // eslint-disable-line sort-imports
import * as markdownActions from '@ReduxActions/markdown';
import LogoReact from '../../assets/images/react.svg';
import LogoReactstrap from '../../assets/images/reactstrap.svg';
import LogoRedux from '../../assets/images/redux.svg';
import packageJson from '../../../package.json';
import './Home.scss'; // eslint-disable-line sort-imports

@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    if (!markdownActions.isMarkdownLoaded(getState())) {
      return dispatch(markdownActions.loadMarkdown());
    }

    return Promise.resolve();
  },
}],
state => ({
  markdown: state.getIn(['markdown']),
}), {
  loadMarkdown: markdownActions.loadMarkdown,
})
export default class Home extends Component {
  static propTypes = {
    loadMarkdown: PropTypes.func.isRequired,
    markdown: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  };

  constructor(props) {
    super(props);

    this.reloadMarkdown = this.reloadMarkdown.bind(this);
  }

  componentDidUpdate() {
    Prism.highlightAll();
  }

  reloadMarkdown() {
    const { loadMarkdown } = this.props;

    return loadMarkdown();
  }

  renderReloadBtn() {
    const { markdown } = this.props;

    if (markdown.get('loading')) {
      return (
        <Button
          color="secondary"
          size="sm"
          disabled
          outline
        >
          Loading...
        </Button>
      );
    }

    return (
      <Button
        color="secondary"
        size="sm"
        outline
        onClick={this.reloadMarkdown}
      >
        Reload
      </Button>
    );
  }

  renderMarkdown() {
    const { markdown } = this.props;

    if (markdown.get('loaded')) {
      return (markdown.get('error')) ? (
        <h2>{markdown.get('error')}</h2>
      ) : (
        <Markdown styleName="markdown">{markdown.get('content')}</Markdown>
      );
    }

    return <h5>Loading…</h5>;
  }

  render() {
    return (
      <Container styleName="home" tag="main">
        <Helmet title="Isomorphic web app boilerplate" />
        <Jumbotron styleName="jumbotron" tag="section">
          <ul className="mb-4" styleName="versions">
            <li>
              <LogoReact id="logo-react" />
              <UncontrolledTooltip placement="bottom" target="logo-react">
                React {packageJson.dependencies.react}
              </UncontrolledTooltip>
            </li>
            <li>
              <LogoRedux id="logo-redux" />
              <UncontrolledTooltip placement="bottom" target="logo-redux">
                Redux {packageJson.dependencies.redux}
              </UncontrolledTooltip>
            </li>
            <li>
              <LogoReactstrap id="logo-reactstrap" />
              <UncontrolledTooltip placement="bottom" target="logo-reactstrap">
                Bootstrap {packageJson.dependencies.bootstrap}<br />
                Reactstrap {packageJson.dependencies.reactstrap}
              </UncontrolledTooltip>
            </li>
          </ul>
          <Row className="justify-content-center">
            <Col md={6}>
              <p className="lead">{packageJson.description}</p>
              <div className="buttons">
                <Button
                  color="primary"
                  href="https://github.com/victorpopkov/isomorphic-redux-reactstrap"
                  size="lg"
                  tag="a"
                  outline
                >
                  View on GitHub
                </Button>
              </div>
            </Col>
          </Row>
        </Jumbotron>
        <Row className="justify-content-center">
          <Col md={9}>
            <div className="d-flex align-items-center">
              <h5 className="flex-grow-1">README.md</h5>
              {this.renderReloadBtn()}
            </div>
            <hr />
            {this.renderMarkdown()}
          </Col>
        </Row>
      </Container>
    );
  }
}
