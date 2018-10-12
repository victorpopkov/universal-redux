import {
  Col,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';
import React from 'react';

const Sidebar = () => (
  <Col className="d-none d-md-block" md={3}>
    <h5 className="pb-2">Getting Started</h5>
    <Nav vertical>
      <NavItem>
        <IndexLinkContainer to="/">
          <NavLink>Overview</NavLink>
        </IndexLinkContainer>
      </NavItem>
    </Nav>
    <hr className="mb-4" />
    <h5 className="pb-2">Examples</h5>
    <Nav vertical>
      <NavItem>
        <LinkContainer to="/404">
          <NavLink>404 Not Found</NavLink>
        </LinkContainer>
      </NavItem>
    </Nav>
  </Col>
);

export default Sidebar;
