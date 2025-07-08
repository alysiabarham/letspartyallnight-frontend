// frontend/src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
// Import extendTheme from the theming sub-path
// src/index.tsx
import { extendTheme } from '@chakra-ui/react';
const theme = extendTheme({
  colors: {
    neon: {
      blue: '#00FFFF',
      pink: '#FF00FF',
      yellow: '#FFFF00',
      purple: '#BF00FF',
      green: '#00FF00',
      red: '#FF0040'
    },
    background: '#1A1A2E',
    textLight: '#E0E0FF',
  },
  fonts: {
    heading: `'Orbitron', sans-serif`,
    body: `'Roboto', sans-serif`,
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: 'background',
        color: 'textLight',
        margin: 0,
        padding: 0,
        overflowX: 'hidden',
      },
      'html, body, #root': {
        height: '100%',
      },
      '@keyframes neon-glow': {
        '0%': { textShadow: `0 0 10px ${props.theme.colors.neon.pink}, 0 0 20px ${props.theme.colors.neon.pink}` },
        '100%': { textShadow: `0 0 20px ${props.theme.colors.neon.pink}, 0 0 40px ${props.theme.colors.neon.pink}, 0 0 60px ${props.theme.colors.neon.purple}, 0 0 80px ${props.theme.colors.neon.purple}, 0 0 100px ${props.theme.colors.neon.purple}` },
      },
    }),
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);