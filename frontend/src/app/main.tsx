import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.js';
import '../styles/index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element #root not found in document DOM.');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
