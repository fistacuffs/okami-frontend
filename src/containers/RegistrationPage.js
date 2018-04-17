/**
 * RegistrationPage.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

import { NavBar } from './NavBar';
import { Header } from './Header';
import { Display } from './Display';
import { Footer } from './Footer';


export const RegistrationPage = props => (
  <div>
    <NavBar />
    <Header />
    <Display>
      Registration Component to be added
    </Display>
    <Footer>
      <Button onClick={props.changeViewToLandingPage}>
        HOME
      </Button>
      <Button onClick={props.changeViewToLoginPage}>
        LOGIN
      </Button>
    </Footer>
  </div>
);


RegistrationPage.propTypes = {
  changeViewToLandingPage: PropTypes.func.isRequired,
  changeViewToLoginPage: PropTypes.func.isRequired,
};


export default RegistrationPage;
