import React from 'react';

import { NavBar } from './NavBar';
import { Header } from './Header';
import { Display } from './Display';
import { Footer } from './Footer';
import { Login } from '../components/Login';

export const LoginPage = () => (
  <div>
    <NavBar />
    <Header />
    <Display>
      <Login
        className="login"
      />
    </Display>
    <Footer />
  </div>
);

export default LoginPage;
