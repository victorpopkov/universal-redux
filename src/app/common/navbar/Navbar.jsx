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
import GitHub from '../github/GitHub';
import NavbarMobile from './NavbarMobile';

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

  renderMenu = () => (
    <div className="d-block d-lg-inline-block ml-auto text-center">
      <hr className="d-block d-md-none" />
      <Nav className="d-flex align-content-center align-items-center" navbar>
        <NavItem className="mr-0 mr-lg-2">
          <GitHub className="mb-sm-2" />
        </NavItem>
        <NavItem>
          <NavLink href={config.package.repository}>GitHub</NavLink>
        </NavItem>
      </Nav>
    </div>
  );

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
            {this.renderMenu()}
            <NavbarMobile />
          </Collapse>
        </Container>
      </BaseNavbar>
    );
  }
}

export default Navbar;
