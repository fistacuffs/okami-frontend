import React from 'react';

import { NavBar } from './NavBar';
import { Header } from './Header';
import { Display } from './Display';
import { Footer } from './Footer';
import { Chart } from '../components/Chart';

export const LandingPage = () => (
  <div>
    <NavBar />
    <Header />
    <Display>
      <Chart />
    </Display>
    <Footer />
  </div>
);

export default LandingPage;
