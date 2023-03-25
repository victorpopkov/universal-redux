import { Button, Col, Container, Row, UncontrolledTooltip } from 'reactstrap';
import PropTypes from 'prop-types';
import React from 'react';
import config from '@Config';
import classNames from 'classnames';
import LogoReact from './logo_react.svg';
import LogoReactstrap from './logo_reactstrap.svg';
import LogoRedux from './logo_redux.svg';
import Version from '../version/Version';
import styles from './Jumbotron.scss';

const Jumbotron = ({
  latestDevRevision,
  latestDevVersion,
  latestStableRevision,
  latestStableVersion,
}) => (
  <Col
    className={classNames('py-5', 'text-center', styles.jumbotron)}
    lg={12}
    tag="section"
  >
    <Container>
      <h1 className="mb-3">{config.package.name}</h1>
      {latestStableRevision && latestStableVersion && (
        <Version
          className="me-2"
          color="primary"
          githubRef={config.package.githubRef}
          revision={latestStableRevision}
          title="Latest Stable"
          version={`v${latestStableVersion}`}
        />
      )}
      {latestDevRevision && latestDevVersion && (
        <Version
          githubRef={config.package.githubRef}
          revision={latestDevRevision}
          title="Latest Development"
          version={`v${latestDevVersion}`}
        />
      )}
      <ul className={classNames('mt-3 mb-3', styles.versions)}>
        <li>
          <LogoReact id="logo-react" />
          <UncontrolledTooltip
            fade={false}
            placement="bottom"
            target="logo-react"
          >
            {`React ${config.package.dependencies.react}`}
          </UncontrolledTooltip>
        </li>
        <li>
          <LogoRedux id="logo-redux" />
          <UncontrolledTooltip
            fade={false}
            placement="bottom"
            target="logo-redux"
          >
            {`Redux ${config.package.dependencies.redux}`}
          </UncontrolledTooltip>
        </li>
        <li>
          <LogoReactstrap id="logo-reactstrap" />
          <UncontrolledTooltip
            fade={false}
            placement="bottom"
            target="logo-reactstrap"
          >
            {`Bootstrap ${config.package.dependencies.bootstrap}`}
            <br />
            {`Reactstrap ${config.package.dependencies.reactstrap}`}
          </UncontrolledTooltip>
        </li>
      </ul>
      <Row className="justify-content-center">
        <Col md={12}>
          <p className="lead fw-normal">{config.package.description}</p>
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
  </Col>
);

Jumbotron.propTypes = {
  latestDevRevision: PropTypes.string,
  latestDevVersion: PropTypes.string,
  latestStableRevision: PropTypes.string,
  latestStableVersion: PropTypes.string,
};

Jumbotron.defaultProps = {
  latestDevRevision: null,
  latestDevVersion: null,
  latestStableRevision: null,
  latestStableVersion: null,
};

export default Jumbotron;
