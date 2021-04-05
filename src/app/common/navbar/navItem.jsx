import './navItem.scss';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import React from 'react';

export default (name, to, className, isHref) => (
  <NavItem className={className}>
    {!isHref ? (
      <NavLink styleName="link" tag={Link} to={to}>
        {name}
      </NavLink>
    ) : (
      <NavLink href={to} styleName="link">
        {name}
      </NavLink>
    )}
  </NavItem>
);
