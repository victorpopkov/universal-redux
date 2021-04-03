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
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
    this.setState((state) => ({
      collapsed: !state.collapsed,
    }));
  }

  render() {
    const { collapsed } = this.state;

    return (
      <BaseNavbar expand="xl" light>
        <Container>
          <NavbarBrand tag={Link} to="/">
            {config.package.name}
          </NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} />
          <Collapse isOpen={collapsed} timeout={0} navbar>
            <div className="d-block d-lg-inline-block ml-auto text-center">
              <hr className="d-block d-md-none" />
              <Nav
                className="d-flex align-content-center align-items-center"
                navbar
              >
                <NavItem>
                  <NavLink href={config.package.repository}>GitHub</NavLink>
                </NavItem>
              </Nav>
            </div>
            <div className="d-block d-lg-none ml-auto text-center">
              <hr />
              <h6>Getting Started</h6>
              <Nav navbar>
                <NavItem>
                  <NavLink tag={Link} to="/">
                    Overview
                  </NavLink>
                </NavItem>
              </Nav>
              <hr />
              <h6>Examples</h6>
              <Nav navbar>
                <NavItem>
                  <NavLink tag={Link} to="/404">
                    404 Not Found
                  </NavLink>
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
