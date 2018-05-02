/**
 * Footer.js
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
);


Footer.defaultProps = {
  children: undefined,
};


Footer.propTypes = {
  children: PropTypes.node,
};


export default Footer;
