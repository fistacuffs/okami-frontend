/**
 * RegistrationPage.js
 */
import React from 'react';
import PropTypes from 'prop-types';

import { NavBar } from './NavBar';
import { Header } from './Header';
import { Display } from './Display';
import { Footer } from './Footer';


export const RegistrationPage = props => (
  <div>
    <NavBar
      changeViewToLandingPage={props.changeViewToLandingPage}
      changeViewToLoginPage={props.changeViewToLoginPage}
      changeViewToRegistrationPage={props.changeViewToRegistrationPage}
    />
    <Header />
    <Display>
      Registration Component to be added
    </Display>
    <Footer>
      empty footer
    </Footer>
  </div>
);


RegistrationPage.propTypes = {
  changeViewToLandingPage: PropTypes.func.isRequired,
  changeViewToLoginPage: PropTypes.func.isRequired,
  changeViewToRegistrationPage: PropTypes.func.isRequired,
};


export default RegistrationPage;
