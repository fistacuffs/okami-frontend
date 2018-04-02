import React from 'react';
import PropTypes from 'prop-types';

import './Containers.css';

export function Display(props) {
  return (
    <section className="display">
      {props.children}
    </section>
  );
}


Display.defaultProps = {
  children: undefined,
};

Display.propTypes = {
  children: PropTypes.node,
};

export default Display;
