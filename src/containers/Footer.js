/**
 * @file
 * Footer.js
 * The footer component is used differently from page view to page view. It will
 * always contain a link to the crypto compare API at their request by allowing
 * the free use of their API.
 *
 * @author Nicholas Weitzel
 * @since 1.0.0
 */
import React from 'react';
import PropTypes from 'prop-types';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faDollarSign from '@fortawesome/fontawesome-free-solid/faDollarSign';
import faCheckCircle from '@fortawesome/fontawesome-free-solid/faCheckCircle';
import faChartLine from '@fortawesome/fontawesome-free-solid/faChartLine';

import './Containers.css';
import ccLogo from '../assets/imgs/cryptocomparelogo.svg';


export const Footer = props => (
  <div className="footer">
    {props.children}
    <a
      className="api-link"
      href="https://min-api.cryptocompare.com/"
    >
      <h5>
        {'Data provided for free use by '}
        <img className="footer-cclogo" src={ccLogo} alt="CryptoCompare API" />
      </h5>
    </a>
  </div>
); // end Footer


const renderMarketingFooter = () => (
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
        icon={faChartLine}
      />
      <h3>track pricing trends</h3>
    </div>
  </div>
);


/**
 * defaults:
 * children - undefined if no children are passed
 */
Footer.defaultProps = {
  children: renderMarketingFooter(),
}; // end defaultProps


/**
 * props:
 * children - child React nodes
 */
Footer.propTypes = {
  children: PropTypes.node,
}; // end propTypes


export default Footer;
