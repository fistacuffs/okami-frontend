/**
 * LandingPage.js
 *
 * This is the main page view of the application. The main content component,
 * display has a search bar, chart, and buttons for finding and displaying
 * information about different currencies. If a user no user is logged in,
 * random currencies are selected for the display. There is also some marketing
 * type information shown in the footer.
 */
import React from 'react';
import PropTypes from 'prop-types';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faDollarSign from '@fortawesome/fontawesome-free-solid/faDollarSign';
import faCheckCircle from '@fortawesome/fontawesome-free-solid/faCheckCircle';
import faBan from '@fortawesome/fontawesome-free-solid/faBan';

import { NavBar } from './NavBar';
import { Header } from './Header';
import { Display } from './Display';
import { Footer } from './Footer';
import { SearchBar } from '../components/SearchBar';
import { MultiCoinGroup } from '../components/MultiCoinGroup';

import './Containers.css';


export const LandingPage = props => (
  <div>
    <NavBar
      changePageView={props.changePageView}
    />
    <Header
      changePageView={props.changePageView}
    />
    <Display>
      <div className="landing-page-display-container">
        <div className="landing-page-search-bar-container">
          <SearchBar changePageView={props.changePageView} />
        </div>
        <div className="landing-page-mcg-container">
          <MultiCoinGroup changePageView={props.changePageView} />
        </div>
      </div>
    </Display>
    <Footer>
      <div className="footer-icons-container">
        <div className="footer-icon-container">
          <FontAwesomeIcon
            className="footer-icon"
            size="10x"
            icon={faDollarSign}
          />
          <h3>see currency values</h3>
        </div>
        <div className="footer-icon-container">
          <FontAwesomeIcon
            className="footer-icon"
            size="10x"
            icon={faCheckCircle}
          />
          <h3>updated in real time</h3>
        </div>
        <div className="footer-icon-container">
          <FontAwesomeIcon
            className="footer-icon"
            size="10x"
            icon={faBan}
          />
          <h3>no need to sign up</h3>
        </div>
      </div>
    </Footer>
  </div>
); // end LandingPage


/**
 * props:
 *
 * Required:
 * changePageView - function to change App state currentView
 */
LandingPage.propTypes = {
  changePageView: PropTypes.func.isRequired,
}; // end propTypes


export default LandingPage;
