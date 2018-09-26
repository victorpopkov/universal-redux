import { Navbar as BaseNavbar, Container, NavbarBrand } from 'reactstrap';
import { IndexLinkContainer } from 'react-router-bootstrap';
import React from 'react';
import packageJson from '@Root/package.json';

const Navbar = () => (
  <BaseNavbar color="faded" expand="md" light>
    <Container className="text-center">
      <IndexLinkContainer to="/">
        <NavbarBrand className="ml-auto mr-auto">{packageJson.name}</NavbarBrand>
      </IndexLinkContainer>
    </Container>
  </BaseNavbar>
);

export default Navbar;
