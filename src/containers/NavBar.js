import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle,
  Row } from 'reactstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faBars from '@fortawesome/fontawesome-free-solid/faBars';

import './Containers.css';

export class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
    };
  } // end constructor


  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  } // end toggle()


  render() {
    return (
      <Row className="navbar">
        <Col>
          <Dropdown
            size="lg"
            isOpen={this.state.dropdownOpen}
            toggle={this.toggle}
          >
            <DropdownToggle>
              <FontAwesomeIcon icon={faBars} />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={this.props.changeViewToLandingPage}>
                HOME
              </DropdownItem>
              <DropdownItem>link 2</DropdownItem>
              <DropdownItem>link 3</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Col>
        <Col /><Col /><Col /><Col /><Col /><Col /><Col /><Col /><Col />
        <Col>
          <Button
            className="navbar-button"
            onClick={this.props.changeViewToRegistrationPage}
          >
            SIGN UP
          </Button>
        </Col>
        <Col>
          <Button
            className="navbar-button"
            onClick={this.props.changeViewToLoginPage}
          >
            LOGIN
          </Button>
        </Col>
      </Row>
    );
  } // end render()
} // end class NavBar


NavBar.propTypes = {
  changeViewToLandingPage: PropTypes.func.isRequired,
  changeViewToLoginPage: PropTypes.func.isRequired,
  changeViewToRegistrationPage: PropTypes.func.isRequired,
}; // end propTypes


export default NavBar;
