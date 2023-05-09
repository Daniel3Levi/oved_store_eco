import React from 'react';

import { HelmetProvider } from 'react-helmet-async';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import { StoreProvider } from './Store';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'react-bootstrap';
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <StoreProvider>
    <ThemeProvider dir="rtl">
      <HelmetProvider>
        <PayPalScriptProvider deferLoading={true}>
          <App tab="home" />
        </PayPalScriptProvider>
      </HelmetProvider>
    </ThemeProvider>
  </StoreProvider>
);
