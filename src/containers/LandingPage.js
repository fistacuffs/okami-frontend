/**
 * @file
 * LandingPage.js
 * This is the main page view of the application. The main content component,
 * display has a search bar, chart, and buttons for finding and displaying
 * information about different currencies. If a user no user is logged in,
 * random currencies are selected for the display. There is also some marketing
 * type information shown in the footer.
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
import { SearchBar } from '../components/SearchBar';
import { MultiCoinGroup } from '../components/MultiCoinGroup';

import './Containers.css';


export const LandingPage = props => (
  <div className="page-width">
    <NavBar
      changePageView={props.changePageView}
    />
    <Header
      changePageView={props.changePageView}
    />
    <Display>
      <SearchBar changePageView={props.changePageView} />
      <MultiCoinGroup changePageView={props.changePageView} />
    </Display>
    <Footer />
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
