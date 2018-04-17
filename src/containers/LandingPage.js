/**
 * LandingPage.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

import { NavBar } from './NavBar';
import { Header } from './Header';
import { Display } from './Display';
import { Footer } from './Footer';
import { ChartTerminal } from '../components/ChartTerminal';
// import globalvars from '../globalvars';


export const LandingPage = props => (
  <div>
    <NavBar />
    <Header />
    <Display>
      <ChartTerminal />
    </Display>
    <Footer>
      <Button onClick={props.changeViewToLoginPage}>
        LOGIN
      </Button>
    </Footer>
  </div>
);


LandingPage.propTypes = {
  changeViewToLoginPage: PropTypes.func.isRequired,
};


export default LandingPage;
