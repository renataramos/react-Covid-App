import React from 'react';
import ReactDOM from 'react-dom';
import './components/CSS/index.css';
import App from './components/App.js';
import {BrowserRouter} from 'react-router-dom'


ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);


