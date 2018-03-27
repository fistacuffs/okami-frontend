import React from 'react';

import { NavBar } from './NavBar';
import { Header } from './Header';
import { Display } from './Display';
import { Footer } from './Footer';

export const LandingPage = () => (
  <div>
    <NavBar />
    <Header />
    <Display />
    <Footer />
  </div>
);

export default LandingPage;
