import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

import './Containers.css';

export const NavBar = () => (
  <Navbar color="dark" dark toggleable>
    <NavbarBrand href="/">Okami</NavbarBrand>
    <NavbarToggler right />
    <Collapse isOpen={false} navbar>
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink href="/components/">Components</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="https://github.com/reactstrap/reactstrap">Github</NavLink>
        </NavItem>
      </Nav>
    </Collapse>
  </Navbar>
);

export default NavBar;
