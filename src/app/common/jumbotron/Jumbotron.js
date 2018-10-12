import './Jumbotron.scss';
import {
  Jumbotron as BaseJumbotron,
  Button,
  Col,
  Container,
  Row,
  UncontrolledTooltip,
} from 'reactstrap';
import React from 'react';
import LogoReact from './logo_react.svg'; // eslint-disable-line sort-imports
import LogoReactstrap from './logo_reactstrap.svg';
import LogoRedux from './logo_redux.svg';
import config from '@Config';

const Jumbotron = () => (
  <BaseJumbotron className="m-0 pb-5 pt-5" styleName="jumbotron" tag="section">
    <Container>
      <h1>{config.package.name}</h1>
      <h6 className="mb-4">
        Latest version:
        {' '}
        {config.package.version}
      </h6>
      <ul className="mb-4" styleName="versions">
        <li>
          <LogoReact id="logo-react" />
          <UncontrolledTooltip placement="bottom" target="logo-react">
            React
            {' '}
            {config.package.dependencies.react}
          </UncontrolledTooltip>
        </li>
        <li>
          <LogoRedux id="logo-redux" />
          <UncontrolledTooltip placement="bottom" target="logo-redux">
            Redux
            {' '}
            {config.package.dependencies.redux}
          </UncontrolledTooltip>
        </li>
        <li>
          <LogoReactstrap id="logo-reactstrap" />
          <UncontrolledTooltip placement="bottom" target="logo-reactstrap">
            Bootstrap
            {' '}
            {config.package.dependencies.bootstrap}
            <br />
            Reactstrap
            {' '}
            {config.package.dependencies.reactstrap}
          </UncontrolledTooltip>
        </li>
      </ul>
      <Row className="justify-content-center">
        <Col md={6}>
          <p className="lead">{config.package.description}</p>
          <div className="buttons">
            <Button
              color="primary"
              href={config.package.repository}
              size="lg"
              tag="a"
              outline
            >
              View on GitHub
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  </BaseJumbotron>
);

export default Jumbotron;
