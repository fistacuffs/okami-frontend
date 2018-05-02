/**
 * Header.js
 *
 * This is the header component for the application. There is a logo, title, and
 * tagline displayed as well as some other graphics. The logo element is made
 * clickable to redirect the user to the landing page.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';

import { viewEnum } from '../constants';
import './Containers.css';
import logo from '../assets/imgs/logo.png';
import pawPrintBg from '../assets/imgs/paw-print-background.png';

export const Header = props => (
  <header className="header">
    <Row className="header-container">
      <Col xs="4">
        <div
          className="header-link"
          onClick={() => props.changePageView(viewEnum.LANDINGPAGE)}
          onKeyDown={() => props.changePageView(viewEnum.LANDINGPAGE)}
          role="button"
          tabIndex={0}
        >
          <div>
            <img
              className="header-logo"
              src={logo}
              alt="Logo"
            />
          </div>
          <div className="header-text">
            <h2>okami</h2>
            cryptocurrency tracker<br />simple, fast, accurate
          </div>
        </div>
      </Col>
      <Col
        xs="8"
        style={{ backgroundImage: `url(${pawPrintBg})` }}
        className="header-paw-print-container"
      >
        &nbsp;
      </Col>
    </Row>
  </header>
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
