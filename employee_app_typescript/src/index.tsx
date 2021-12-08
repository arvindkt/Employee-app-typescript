import React from 'react';
import ReactDOM from 'react-dom';
import { Root } from '@athena/forge';
import App from './App';
import '@athena/forge/static/css/forge.css';

import AuthProvider from './context/Auth';


ReactDOM.render(
  <React.StrictMode>
     <AuthProvider>
      <Root>
        <App />
      </Root>
      </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

