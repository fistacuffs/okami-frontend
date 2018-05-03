/**
 * Header.js
 *
 * This is the header component for the application. There is a logo, title, and
 * tagline displayed as well as some other graphics. The logo element is made
 * clickable to redirect the user to the landing page.
 */
import React from 'react';
import PropTypes from 'prop-types';

import { viewEnum } from '../constants';

import './Containers.css';
import logo from '../assets/imgs/logo.png';
import pawPrintBg from '../assets/imgs/paw-print-background.png';

export const Header = props => (
  <div className="header">
    <div
      className="header-link"
      onClick={() => props.changePageView(viewEnum.LANDINGPAGE)}
      onKeyDown={() => props.changePageView(viewEnum.LANDINGPAGE)}
      role="button"
      tabIndex={0}
    >
      <div className="header-logo-container">
        <img
          className="header-logo"
          src={logo}
          alt="Logo"
        />
      </div>
      <div className="header-text">
        <h1>okami</h1>
        cryptocurrency tracker<br />
        simple, fast, accurate
      </div>
    </div>
    <div
      className="header-paw-print-container"
      style={{ backgroundImage: `url(${pawPrintBg})` }}
    />
  </div>
); // end Header


/**
 * props:
 *
 * Required:
 * changePageView - function to change App state currentView
 */
Header.propTypes = {
  changePageView: PropTypes.func.isRequired,
}; // end propTypes


export default Header;
