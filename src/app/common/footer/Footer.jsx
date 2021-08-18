import './Footer.scss';
import { Col, Container, Row } from 'reactstrap';
import React from 'react';
import config from '@Config';
import GitHub from '../github/GitHub';

const Footer = () => (
  <footer className="footer" styleName="footer">
    <Container>
      <Row>
        <Col md={12} styleName="content">
          <ul className="mb-2 mb-sm-0 me-0 me-sm-4">
            <li>
              <a href={config.package.repository}>View on GitHub</a>
            </li>
          </ul>
          <div styleName="github">
            <GitHub />
          </div>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
