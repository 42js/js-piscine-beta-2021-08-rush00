import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';
import { CookiesProvider } from 'react-cookie';
import App from './App';

axios.defaults.baseURL = 'http://localhost:4242';
axios.defaults.withCredentials = true;

ReactDOM.render(
  <CookiesProvider>
    <App />
  </CookiesProvider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
