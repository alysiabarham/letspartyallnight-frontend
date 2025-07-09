// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'; // We'll rename LandingPage to App, or create a new App component
import reportWebVitals from './reportWebVitals';

import { ChakraProvider } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';

// Import BrowserRouter
import { BrowserRouter as Router } from 'react-router-dom';


const theme = extendTheme({
  colors: {
    brand: {
      500: '#8A2BE2', // Example purple color
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      {/* Wrap your App (which will contain routes) with Router */}
      <Router>
        <App />
      </Router>
    </ChakraProvider>
  </React.StrictMode>
);

reportWebVitals();