import './index.css';
import App from './App';
import React from 'react';
import store from "./store";
import ReactDOM from 'react-dom/client';

store.dispatch({type: "account/deposit", payload: 250})
console.log(store.getState());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);