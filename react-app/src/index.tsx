import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MortgageCalculator from './containers/MortgageCalculator';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/reset.css';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <MortgageCalculator />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
