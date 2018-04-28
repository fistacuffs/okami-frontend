/**
 * Footer.js
 */
import React from 'react';
import PropTypes from 'prop-types';

import './Containers.css';


export const Footer = props => (
  <footer className="footer">
    {props.children}
  </footer>
);


Footer.defaultProps = {
  children: undefined,
};


Footer.propTypes = {
  children: PropTypes.node,
};


export default Footer;
