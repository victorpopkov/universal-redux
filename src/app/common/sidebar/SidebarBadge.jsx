import { NavItem, NavLink } from 'reactstrap';
import React from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import styles from './SidebarBadge.scss';

const SidebarBadge = ({ alt, args, href, path }) => {
  let argsStr = '';

  map(args, (value, key) => {
    argsStr += `&${key}=${value}`;
  });

  return (
    <NavItem>
      <NavLink
        className={styles.badge}
        href={href}
        rel="noopener noreferrer"
        target="_blank"
      >
        <img
          alt={alt}
          src={`https://img.shields.io/${path}?style=flat-square${argsStr}`}
        />
      </NavLink>
    </NavItem>
  );
};

SidebarBadge.propTypes = {
  alt: PropTypes.string,
  args: PropTypes.oneOfType([PropTypes.object]),
  href: PropTypes.string,
  path: PropTypes.string,
};

SidebarBadge.defaultProps = {
  alt: null,
  args: {},
  href: null,
  path: null,
};

export default SidebarBadge;
