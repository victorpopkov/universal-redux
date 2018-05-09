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
    const promises = [];

    if (!markdownActions.isMarkdownLoaded(getState())) {
      promises.push(dispatch(markdownActions.loadMarkdown()));
    }

    return Promise.all(promises);
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

  componentDidMount() {
    this.reloadMarkdown();
  }

  reloadMarkdown() {
    const { loadMarkdown } = this.props;

    return loadMarkdown().then(() =>
      Prism.highlightAll());
  }

  render() {
    const { markdown } = this.props;

    let reloadBtnValue = 'Reload';
    let reloadBtnProps = {
      color: 'secondary',
      onClick: this.reloadMarkdown,
      outline: true,
      size: 'sm',
    };

    if (markdown.get('loading')) {
      reloadBtnValue = 'Loading...';
      reloadBtnProps = {
        ...reloadBtnProps,
        disabled: true,
      };
    }

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
              <Button {...reloadBtnProps}>{reloadBtnValue}</Button>
            </div>
            <hr />
            <Markdown styleName="markdown">{markdown.get('content')}</Markdown>
          </Col>
        </Row>
      </Container>
    );
  }
}
