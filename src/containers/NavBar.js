import React from 'react';
import { Button, Collapse, Navbar, NavbarToggler, Nav, NavItem } from 'reactstrap';

import './Containers.css';

export class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }


  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }


  render() {
    return (
      <Navbar color="dark" dark className="navbar" expand="false">
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar />
        </Collapse>
        <NavItem>
          <Button color="primary" className="navbar-button">Sign Up</Button>
        </NavItem>
        <NavItem>
          <Button color="primary" className="navbar-button">Login</Button>
        </NavItem>
      </Navbar>
    );
  }
}

export default NavBar;
