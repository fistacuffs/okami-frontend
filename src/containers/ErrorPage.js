/**
 * ErrorPage.js
 * This is a simple page view to display errors loading data from the backend
 * server on the startup of the application.
 */
import React from 'react';
import PropTypes from 'prop-types';

export const ErrorPage = props => (
  <h1>{props.message}</h1>
); // end ErrorPage


/**
 * defaults:
 * message - simple message naming component error page
 */
ErrorPage.defaultProps = {
  message: 'Error Page',
}; // end defaultProps


/**
 * props:
 * message - string containing the error message to display
 */
ErrorPage.propTypes = {
  message: PropTypes.string,
}; // end propTypes


export default ErrorPage;
