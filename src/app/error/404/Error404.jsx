import { Button, Container } from 'reactstrap';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import React from 'react';
import { hot } from 'react-hot-loader'; // eslint-disable-line import/no-extraneous-dependencies
import styles from './Error404.scss';

const Error404 = () => (
  <main role="main" className={styles.error}>
    <Helmet title="Error 404 – Not Found" />
    <Container className="text-center">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <Button color="secondary" tag={Link} to="/" outline>
        <span>&larr; Back to Homepage</span>
      </Button>
    </Container>
  </main>
);

export default hot(module)(Error404);
