import { Nav } from 'reactstrap';
import React from 'react';
import classNames from 'classnames';
import { hot } from 'react-hot-loader';
import config from '@Config';
import GitHub from '../github/GitHub';
import navItem from './navItem';
import styles from './NavbarMenu.scss';

const NavbarMenu = () => (
  <div className="d-none d-lg-inline-block ms-auto text-center">
    <Nav
      className={classNames(
        styles.menu,
        'd-flex',
        'align-content-center',
        'align-items-center',
      )}
      navbar
    >
      <GitHub className="mb-sm-2" githubRef={config.package.githubRef} />
      {navItem('GitHub', config.package.repository, null, true)}
    </Nav>
  </div>
);

export default hot(module)(NavbarMenu);
