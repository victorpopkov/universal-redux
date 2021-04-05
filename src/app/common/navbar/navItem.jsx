import './navItem.scss';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import React from 'react';

export default (name, to, className) => (
  <NavItem className={className}>
    <NavLink styleName="link" tag={Link} to={to}>
      {name}
    </NavLink>
  </NavItem>
);
