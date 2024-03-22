import '@repo/ui/globals.css';
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import { Providers } from './providers';

ReactDOM.createRoot(document.querySelector('#app')!).render(
  <React.StrictMode>
    <Providers />
  </React.StrictMode>,
);
