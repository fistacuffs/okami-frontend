/**
 * NavBar.js
 *
 * This is the navigation bar component for the application. There is a
 * hamburger menu with links on the left side of the menu. If no user is logged
 * in, then there are buttons for login in and registration in the navigation
 * bar. If a user is logged in, then their is a logout button and their username
 * is displayed.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle } from 'reactstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faBars from '@fortawesome/fontawesome-free-solid/faBars';

import { globalvars } from '../globalvars';
import { viewEnum } from '../constants';
import './Containers.css';


export class NavBar extends React.Component {
  /**
   * @constructor
   * NavBar constructor
   * -iniitializes state property for hamburger menu: dropdownOpen
   * -binds methods toggle and logout to 'this' component
   *
   * @param props: to pass any props to React components
   */
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false,
    }; // end state

    this.toggle = this.toggle.bind(this);
    this.logout = this.logout.bind(this);
  } // end constructor


  /**
   * toggle:
   * method changes the state property dropdownOpen of this component from true
   * to false or vice versa
   */
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    }); // end setState()
  } // end toggle()


  /**
   * logut:
   * method changes all global user variables to null and then redirects to the
   * landing page.
   */
  logout() {
    globalvars.userId = null;
    globalvars.username = null;
    globalvars.timeStamp = null;
    globalvars.userCoinList = [];

    this.props.changePageView(viewEnum.LANDINGPAGE);
  } // end logout()


  /**
   * buttons:
   * method returns button components depending on whether a user is logged in
   * or not
   *
   * @returns registration and login buttons if a user is not logged in
   *          display username and logout button if a user is logged in
   */
  renderButtons() {
    if (globalvars.isLoggedIn()) {
      // display username and logout button
      return (
        <div className="navbar-button-container">
          <h3 className="navbar-username">{globalvars.username}</h3>
          <Button
            className="navbar-button"
            onClick={this.logout}
          >
            LOGOUT
          </Button>
        </div>
      ); // end return()
    } // end if

    // display registration and login button
    return (
      <div className="navbar-button-container">
        <Button
          className="navbar-button"
          onClick={() => this.props.changePageView(viewEnum.REGISTRATIONPAGE)}
        >
          SIGN UP
        </Button>
        <Button
          className="navbar-button"
          onClick={() => this.props.changePageView(viewEnum.LOGINPAGE)}
        >
          LOGIN
        </Button>
      </div>
    ); // end return()
  } // end buttons()


  /**
   * render:
   * Required method of React components to display components called when
   * component is constructed or state is changed.
   */
  render() {
    return (
      <div className="navbar">
        <div className="navbar-menu-container">
          <Dropdown
            size="lg"
            isOpen={this.state.dropdownOpen}
            toggle={this.toggle}
          >
            <DropdownToggle>
              <FontAwesomeIcon icon={faBars} />
            </DropdownToggle>
            <DropdownMenu className="navbar-menu">
              <DropdownItem
                onClick={() => this.props.changePageView(viewEnum.LANDINGPAGE)}
              >
                HOME
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div>
          {this.renderButtons()}
        </div>
      </div>
    ); // end return()
  } // end render()
} // end class NavBar


/**
 * props:
 *
 * Required:
 * changePageView - function to change App state currentView
 */
NavBar.propTypes = {
  changePageView: PropTypes.func.isRequired,
}; // end propTypes


export default NavBar;
