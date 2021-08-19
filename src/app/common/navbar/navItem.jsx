import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import React from 'react';
import styles from './navItem.scss';

export default (name, to, className, isHref) => (
  <NavItem className={className}>
    {!isHref ? (
      <NavLink className={styles.link} tag={Link} to={to}>
        {name}
      </NavLink>
    ) : (
      <NavLink className={styles.link} href={to}>
        {name}
      </NavLink>
    )}
  </NavItem>
);
