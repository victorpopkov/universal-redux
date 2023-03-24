import {
  Navbar as BaseNavbar,
  Collapse,
  NavbarBrand,
  NavbarToggler,
} from 'reactstrap';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import config from '@Config';
import NavbarMenu from './NavbarMenu';
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

  render() {
    const { collapsed } = this.state;

    return (
      <BaseNavbar container="md" expand="lg" light>
        <NavbarBrand tag={Link} to="/">
          {config.package.name}
        </NavbarBrand>
        <NavbarToggler onClick={this.toggleNavbar} />
        <Collapse isOpen={collapsed} timeout={0} navbar>
          <NavbarMenu />
          <NavbarMobile />
        </Collapse>
      </BaseNavbar>
    );
  }
}

export default Navbar;
