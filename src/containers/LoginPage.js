import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

import { NavBar } from './NavBar';
import { Header } from './Header';
import { Display } from './Display';
import { Footer } from './Footer';
import { Login } from '../components/Login';

export const LoginPage = props => (
  <div>
    <NavBar />
    <Header />
    <Display>
      <Login
        className="login"
        changeViewToLandingPage={props.changeViewToLandingPage}
      />
    </Display>
    <Footer>
      <Button onClick={props.changeViewToLandingPage}>
        HOME
      </Button>
    </Footer>
  </div>
);


LoginPage.propTypes = {
  changeViewToLandingPage: PropTypes.func.isRequired,
};


export default LoginPage;
