import {
  Navbar as BaseNavbar,
  Collapse,
  Container,
  Nav,
  NavItem,
  NavLink,
  NavbarBrand,
  NavbarToggler,
} from 'reactstrap';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';
import React, { Component } from 'react';
import config from '@Config';

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);

    this.state = {
      collapsed: false,
    };
  }

  toggleNavbar() {
    this.setState(state => ({
      collapsed: !state.collapsed,
    }));
  }

  render() {
    const { collapsed } = this.state;

    return (
      <BaseNavbar expand="md" light>
        <Container>
          <IndexLinkContainer to="/">
            <NavbarBrand>{config.package.name}</NavbarBrand>
          </IndexLinkContainer>
          <NavbarToggler onClick={this.toggleNavbar} />
          <Collapse isOpen={collapsed} timeout={0} navbar>
            <div className="d-block d-md-inline-block ml-auto text-center">
              <hr className="d-block d-sm-none" />
              <Nav navbar>
                <NavItem>
                  <NavLink href={config.package.repository}>GitHub</NavLink>
                </NavItem>
              </Nav>
            </div>
            <div className="d-md-none d-sm-block ml-auto text-center">
              <hr />
              <h6>Getting Started</h6>
              <Nav navbar>
                <NavItem>
                  <IndexLinkContainer to="/">
                    <NavLink>Overview</NavLink>
                  </IndexLinkContainer>
                </NavItem>
              </Nav>
              <hr />
              <h6>Examples</h6>
              <Nav navbar>
                <NavItem>
                  <LinkContainer to="/404">
                    <NavLink>404 Not Found</NavLink>
                  </LinkContainer>
                </NavItem>
              </Nav>
            </div>
          </Collapse>
        </Container>
      </BaseNavbar>
    );
  }
}

export default Navbar;
