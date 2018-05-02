/**
 * index.js
 *
 * This file is referenced by the index.htm template that was generated with
 * react bootstrap application that was used to initialize package bundling,
 * start scripts, dependency management, etc. This is where the application is
 * mounted to index.html DOM.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import { App } from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
