import React from 'react';

import { NavBar } from './NavBar';
import { Header } from './Header';
import { Display } from './Display';
import { Footer } from './Footer';
import { ChartTerminal } from '../components/ChartTerminal';

// import globalvars from '../globalvars';

export const LandingPage = () => (
  <div>
    <NavBar />
    <Header />
    <Display>
      <ChartTerminal />
    </Display>
    <Footer />
  </div>
);

export default LandingPage;
