/**
 * LoadingPage.js
 *
 * This displays a pleasing page view while the master coin list is loading from
 * the backend server.
 */
import React from 'react';
import PropTypes from 'prop-types';

import { NavBar } from './NavBar';
import { Header } from './Header';
import { Display } from './Display';
import { Footer } from './Footer';


export const LoadingPage = props => (
  <div>
    <NavBar changePageView={props.changePageView} />
    <Header changePageView={props.changePageView} />
    <Display>
      <h1>loading currencies...</h1>
    </Display>
    <Footer />
  </div>
); // end LoadingPage


/**
 * props:
 *
 * Required:
 * changePageView - function to change App state currentView
 */
LoadingPage.propTypes = {
  changePageView: PropTypes.func.isRequired,
}; // end propTypes


export default LoadingPage;
