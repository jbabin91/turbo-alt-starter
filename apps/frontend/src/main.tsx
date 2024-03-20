import '@repo/ui/globals.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';
import { Providers } from './providers/index.tsx';

ReactDOM.createRoot(document.querySelector('#root')!).render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>,
);
