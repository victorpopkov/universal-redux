import { Col, Container, Row } from 'reactstrap';
import React from 'react';
import classNames from 'classnames';
import config from '@Config';
import GitHub from '../github/GitHub';
import styles from './Footer.scss';

const Footer = () => (
  <footer className={classNames(styles.footer, 'footer')}>
    <Container>
      <Row>
        <Col md={12} className={styles.content}>
          <ul className="mb-2 mb-sm-0 me-0 me-sm-4">
            <li>
              <a href={config.package.repository}>View on GitHub</a>
            </li>
          </ul>
          <div className={styles.github}>
            <GitHub />
          </div>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
