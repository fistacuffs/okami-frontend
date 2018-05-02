/**
 * Footer.js
 *
 * The footer component is used differently from page view to page view. It will
 * always contain a link to the crypto compare API at their request by allowing
 * the free use of their API.
 */
import React from 'react';
import PropTypes from 'prop-types';

import './Containers.css';


export const Footer = props => (
  <footer className="footer">
    {props.children}
    <a
      className="api-link"
      href="https://min-api.cryptocompare.com/"
    >
      <h6>
        {'Data provided for free use by the CrypoCompare API'}
      </h6>
    </a>
  </footer>
); // end Footer


/**
 * defaults:
 * children - undefined if no children are passed
 */
Footer.defaultProps = {
  children: undefined,
}; // end defaultProps


/**
 * props:
 * children - child React nodes
 */
Footer.propTypes = {
  children: PropTypes.node,
}; // end propTypes


export default Footer;
