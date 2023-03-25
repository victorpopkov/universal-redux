import { Col, Container, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import styles from './Footer.scss';

const Footer = ({ repository }) => (
  <footer className={classNames(styles.footer, 'footer')}>
    <Container>
      <Row className="align-items-center">
        <Col className={styles.content} md={12}>
          <ul>
            <li>
              <a href={repository}>View on GitHub</a>
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
  </footer>
);

Footer.propTypes = {
  repository: PropTypes.string.isRequired,
};

export default Footer;
