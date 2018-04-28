/**
 * LoginPage.js
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
      changeViewToLandingPage={props.changeViewToLandingPage}
      changeViewToLoginPage={props.changeViewToLoginPage}
      changeViewToRegistrationPage={props.changeViewToRegistrationPage}
    />
    <Header
      changeViewToLandingPage={props.changeViewToLandingPage}
    />
    <Display>
      <Login
        className="login"
        changeViewToLandingPage={props.changeViewToLandingPage}
      />
    </Display>
    <Footer>
      empty footer
    </Footer>
  </div>
);


LoginPage.propTypes = {
  changeViewToLandingPage: PropTypes.func.isRequired,
  changeViewToLoginPage: PropTypes.func.isRequired,
  changeViewToRegistrationPage: PropTypes.func.isRequired,
};


export default LoginPage;
