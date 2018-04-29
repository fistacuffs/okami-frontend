/**
 * RegistrationPage.js
 */
import React from 'react';
import PropTypes from 'prop-types';

import { NavBar } from './NavBar';
import { Header } from './Header';
import { Display } from './Display';
import { Footer } from './Footer';
import { Registration } from '../components/Registration';


export const RegistrationPage = props => (
  <div>
    <NavBar
      changePageView={props.changePageView}
    />
    <Header
      changePageView={props.changePageView}
    />
    <Display>
      <Registration
        className="login"
      />
    </Display>
    <Footer>
      empty footer
    </Footer>
  </div>
);


RegistrationPage.propTypes = {
  changePageView: PropTypes.func.isRequired,
};


export default RegistrationPage;
