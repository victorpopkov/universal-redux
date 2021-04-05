import { Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import React from 'react';
import { hot } from 'react-hot-loader';

const navItem = (name, to, className) => (
  <NavItem className={className}>
    <NavLink tag={Link} to={to}>
      {name}
    </NavLink>
  </NavItem>
);

const NavbarMobile = () => (
  <div className="d-block d-lg-none ml-auto text-center">
    <hr />
    <h6>Getting Started</h6>
    <Nav navbar>
      {navItem('Overview', '/')}
      {navItem('404 Not Found', '/404')}
    </Nav>
    <hr />
    <h6>Examples</h6>
    <Nav navbar>{navItem('404 Not Found', '/404')}</Nav>
  </div>
);

export default hot(module)(NavbarMobile);
