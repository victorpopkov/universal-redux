import './NavbarMobile.scss';
import { Col, Nav, Row } from 'reactstrap';
import React from 'react';
import { hot } from 'react-hot-loader';
import config from '@Config';
import GitHub from '../github/GitHub';
import navItem from './navItem';

const NavbarMobile = () => (
  <div className="d-block d-lg-none ms-auto text-center">
    <Row>
      <Col sm={12}>
        <GitHub githubRef={config.package.githubRef} />
      </Col>
      <Col sm={4}>
        <hr />
        <h6>Navigation</h6>
        <Nav navbar>
          {navItem('GitHub', config.package.repository, null, true)}
        </Nav>
      </Col>
      <Col sm={4}>
        <hr />
        <h6>Getting Started</h6>
        <Nav navbar>{navItem('Overview', '/')}</Nav>
      </Col>
      <Col sm={4}>
        <hr />
        <h6>Examples</h6>
        <Nav navbar>{navItem('404 Not Found', '/404')}</Nav>
      </Col>
    </Row>
  </div>
);

export default hot(module)(NavbarMobile);
