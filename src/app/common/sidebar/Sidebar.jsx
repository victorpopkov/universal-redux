import { Col, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import React from 'react';

const Sidebar = () => (
  <Col className="d-none d-lg-block" md={3}>
    <h5 className="pb-2">Getting Started</h5>
    <Nav vertical>
      <NavItem>
        <NavLink tag={Link} to="/">
          Overview
        </NavLink>
      </NavItem>
    </Nav>
    <hr className="mb-4" />
    <h5 className="pb-2">Examples</h5>
    <Nav vertical>
      <NavItem>
        <NavLink tag={Link} to="/404">
          404 Not Found
        </NavLink>
      </NavItem>
    </Nav>
  </Col>
);

export default Sidebar;
