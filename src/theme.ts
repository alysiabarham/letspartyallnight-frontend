// src/theme.ts
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      50: '#F0F8FF', // AliceBlue (very light)
      100: '#E0FFFF', // Azure
      200: '#ADD8E6', // LightBlue
      300: '#87CEEB', // SkyBlue
      400: '#6495ED', // CornflowerBlue
      500: '#FF00FF', // Neon Magenta (primary for main title, CREATE NEW ROOM button)
      600: '#FF00CC', // Slightly darker magenta
      700: '#CC0099', // Even darker magenta
      800: '#990066', // Dark Magenta
      900: '#660033', // Very Dark Magenta

      primaryBlueNeon: '#00BFFF', // Your favorite vibrant blue neon
      pureGreenNeon: '#00FF00',   // Pure Green Neon (for JOIN ROOM button)
      neonYellow: '#FFFF00',       // Neon Yellow for input text
    },
    glow: {
      pink: '#FF00FF',
      blue: '#00FFFF',
      green: '#00FF00', // This is pure green
      primaryBlue: '#00BFFF',
      yellow: '#FFFF00',
    }
  },
  components: {
    Heading: {
      baseStyle: {
        textShadow: '0 0 5px #FF00FF, 0 0 10px #FF00FF, 0 0 15px #FF00FF, 0 0 20px #FF00FF, 0 0 25px #FF00FF, 0 0 30px #FF00FF, 0 0 35px #FF00FF',
      },
    },
    Button: {
      variants: {
        // CREATE NEW ROOM button (Magenta)
        neon: {
          bg: 'transparent',
          color: 'brand.500',
          border: '2px solid',
          borderColor: 'brand.500',
          boxShadow: '0 0 5px #FF00FF, 0 0 10px #FF00FF, 0 0 15px #FF00FF',
          _hover: {
            bg: 'rgba(255, 0, 255, 0.1)',
            boxShadow: '0 0 8px #FF00FF, 0 0 15px #FF00FF, 0 0 25px #FF00FF',
          },
        },
        // JOIN ROOM button (Pure Green)
        pureGreenNeon: {
          bg: 'transparent',
          color: 'brand.pureGreenNeon',
          border: '2px solid',
          borderColor: 'brand.pureGreenNeon',
          boxShadow: '0 0 5px #00FF00, 0 0 10px #00FF00, 0 0 15px #00FF00',
          _hover: {
            bg: 'rgba(0, 255, 0, 0.1)',
            boxShadow: '0 0 8px #00FF00, 0 0 15px #00FF00, 0 0 25px #00FF00',
          },
        },
      },
    },
    Input: {
        baseStyle: {
            color: 'brand.neonYellow',
            borderColor: 'brand.neonYellow',
            _focus: {
                borderColor: 'brand.neonYellow',
                boxShadow: '0 0 5px #FFFF00',
            },
            _placeholder: {
                color: 'brand.neonYellow',
                opacity: 0.7
            }
        }
    }
  }
});

export default theme;
