/**
 * @file
 * LoginPage.js
 * This is the login page view container. The main function is to display the
 * login form for the user to login to the backend server.
 *
 * @author Nicholas Weitzel
 * @since 1.0.0
 */
import React from 'react';
import PropTypes from 'prop-types';

import { NavBar } from './NavBar';
import { Header } from './Header';
import { Display } from './Display';
import { Footer } from './Footer';
import { Login } from '../components/Login';


export const LoginPage = props => (
  <div className="page-width">
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
    <Footer />
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
