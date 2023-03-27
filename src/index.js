import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Pufferdle from './Pufferdle';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Pufferdle />
  </React.StrictMode>
);
