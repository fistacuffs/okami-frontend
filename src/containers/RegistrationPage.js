/**
 * @file
 * RegistrationPage.js
 * This is the registration page view container. The main function is to display
 * the registration form for the user to create login information in the backend
 * server.
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
import { Registration } from '../components/Registration';


export const RegistrationPage = props => (
  <div className="page-width">
    <NavBar
      changePageView={props.changePageView}
    />
    <Header
      changePageView={props.changePageView}
    />
    <Display>
      <Registration changePageView={props.changePageView} />
    </Display>
    <Footer />
  </div>
); // end RegistrationPage


/**
 * props:
 *
 * Required:
 * changePageView - function to change App state currentView
 */
RegistrationPage.propTypes = {
  changePageView: PropTypes.func.isRequired,
}; // end propTypes


export default RegistrationPage;
