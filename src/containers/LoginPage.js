/**
 * LoginPage.js
 *
 * This is the login page view container. The main function is to display the
 * login form for the user to login to the backend server.
 */
import React from 'react';
import PropTypes from 'prop-types';

import { NavBar } from './NavBar';
import { Header } from './Header';
import { Display } from './Display';
import { Footer } from './Footer';
import { Login } from '../components/Login';


export const LoginPage = props => (
  <div>
    <NavBar
      changePageView={props.changePageView}
    />
    <Header
      changePageView={props.changePageView}
    />
    <Display>
      <Login
        className="login"
        changePageView={props.changePageView}
      />
    </Display>
    <Footer>
      <h3>CMSC 495 (7982) Group 1</h3>
    </Footer>
  </div>
); // end LoginPage


/**
 * props:
 *
 * Required:
 * changePageView - function to change App state currentView
 */
LoginPage.propTypes = {
  changePageView: PropTypes.func.isRequired,
}; // end propTypes


export default LoginPage;
