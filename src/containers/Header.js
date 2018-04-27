import React from 'react';
import { Row, Col } from 'reactstrap';

import './Containers.css';
import logo from '../assets/imgs/logo.png';
import pawPrintBg from '../assets/imgs/paw-print-background.png';

export const Header = () => (
  <header className="header">
    <Row className="header-container">
      <Col xs="4">
        <img src={logo} alt="Logo" className="header-logo" />
        <div className="header-text">
          <h2>okami</h2>cryptocurrency tracker<br />simple, fast, accurate
        </div>
      </Col>
      <Col xs="8" style={{ backgroundImage: `url(${pawPrintBg})` }} className="header-paw-print-container">&nbsp;</Col>
    </Row>
  </header>
);

export default Header;
