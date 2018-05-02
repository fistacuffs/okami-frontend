/**
 * Display.js
 *
 * The display component is used differently from page view to page view. It is
 * the container for the main content of the page view.
 */
import React from 'react';
import PropTypes from 'prop-types';

import './Containers.css';


export const Display = props => (
  <section className="display">
    {props.children}
  </section>
); // end Display


/**
 * defaults:
 * children - undefined if no children are passed
 */
Display.defaultProps = {
  children: undefined,
}; // end defaultProps


/**
 * props:
 * children - child React nodes
 */
Display.propTypes = {
  children: PropTypes.node,
}; // end propTypes


export default Display;
