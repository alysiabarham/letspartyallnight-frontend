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
      500: '#FF00FF', // Neon Magenta (primary for title, create button)
      600: '#FF00CC', // Slightly darker magenta
      700: '#CC0099', // Even darker magenta
      800: '#990066', // Dark Magenta
      900: '#660033', // Very Dark Magenta

      // --- NEW NEON COLORS (Matching original screenshot) ---
      blueNeon: '#00FFFF',  // Cyan/Aqua
      greenNeon: '#00FF00', // Lime Green
      // --- ----------------------------------------------- ---
    },
    // You can keep glow if you want to use it for specific effects
    glow: {
      pink: '#FF00FF',
      blue: '#00FFFF',
      green: '#00FF00',
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
        neon: {
          bg: 'brand.500', // Default to magenta for 'create'
          color: 'white',
          boxShadow: '0 0 5px #FF00FF, 0 0 10px #FF00FF, 0 0 15px #FF00FF',
          _hover: {
            bg: 'brand.600',
            boxShadow: '0 0 8px #FF00FF, 0 0 15px #FF00FF, 0 0 25px #FF00FF',
          },
        },
        // --- NEW NEON BUTTON VARIANTS ---
        neonBlue: {
          bg: 'transparent', // Transparent background
          color: 'brand.blueNeon',
          border: '2px solid',
          borderColor: 'brand.blueNeon',
          boxShadow: '0 0 5px #00FFFF, 0 0 10px #00FFFF, 0 0 15px #00FFFF',
          _hover: {
            bg: 'rgba(0, 255, 255, 0.1)', // Slight background on hover
            boxShadow: '0 0 8px #00FFFF, 0 0 15px #00FFFF, 0 0 25px #00FFFF',
          },
        },
        neonGreen: {
          bg: 'transparent', // Transparent background
          color: 'brand.greenNeon',
          border: '2px solid',
          borderColor: 'brand.greenNeon',
          boxShadow: '0 0 5px #00FF00, 0 0 10px #00FF00, 0 0 15px #00FF00',
          _hover: {
            bg: 'rgba(0, 255, 0, 0.1)', // Slight background on hover
            boxShadow: '0 0 8px #00FF00, 0 0 15px #00FF00, 0 0 25px #00FF00',
          },
        },
        // --- ------------------------ ---
      },
    },
    Input: {
        baseStyle: {
            // --- INPUT TEXT COLOR & BORDER ---
            color: 'white', // <--- MAKE TYPING VISIBLE
            borderColor: 'brand.blueNeon', // Use blue neon for input borders
            _focus: {
                borderColor: 'brand.blueNeon',
                boxShadow: '0 0 5px #00FFFF',
            },
            // --- ------------------------- ---
        }
    }
  }
});

export default theme;
