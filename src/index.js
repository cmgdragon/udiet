import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import UserAuthContext from './Context/userContext';

ReactDOM.render(
  <React.StrictMode>
    <UserAuthContext>
      <App />
    </UserAuthContext>
  </React.StrictMode>,
  document.getElementById('root')
);