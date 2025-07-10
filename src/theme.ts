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
      500: '#FF00FF', // Neon Magenta (primary for main title)
      600: '#FF00CC', // Slightly darker magenta
      700: '#CC0099', // Even darker magenta
      800: '#990066', // Dark Magenta
      900: '#660033', // Very Dark Magenta

      // Keeping these defined but will avoid using them for buttons/borders
      blueNeon: '#00FFFF',  // Cyan/Aqua
      greenNeon: '#00FF00', // Lime Green

      primaryBlueNeon: '#00BFFF', // Your favorite vibrant blue neon
      neonYellow: '#FFFF00',       // Neon Yellow for input text
    },
    glow: {
      pink: '#FF00FF',
      blue: '#00FFFF',
      green: '#00FF00',
      primaryBlue: '#00BFFF',
      yellow: '#FFFF00',
    }
  },
  components: {
    Heading: {
      baseStyle: {
        // Main title remains magenta, RoomPage heading will be primaryBlueNeon
        textShadow: '0 0 5px #FF00FF, 0 0 10px #FF00FF, 0 0 15px #FF00FF, 0 0 20px #FF00FF, 0 0 25px #FF00FF, 0 0 30px #FF00FF, 0 0 35px #FF00FF',
      },
    },
    Button: {
      variants: {
        // Default neon variant (magenta) - will be used for CREATE NEW ROOM button
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
        // Primary Blue Neon button variant - will be used for JOIN ROOM button
        primaryNeonBlue: {
          bg: 'transparent',
          color: 'brand.primaryBlueNeon',
          border: '2px solid',
          borderColor: 'brand.primaryBlueNeon',
          boxShadow: '0 0 5px #00BFFF, 0 0 10px #00BFFF, 0 0 15px #00BFFF',
          _hover: {
            bg: 'rgba(0, 191, 255, 0.1)',
            boxShadow: '0 0 8px #00BFFF, 0 0 15px #00BFFF, 0 0 25px #00BFFF',
          },
        },
        // Removed neonGreen variant to avoid blue-green mixture
      },
    },
    Input: {
        baseStyle: {
            color: 'brand.neonYellow',       // Input text color is now neon yellow
            borderColor: 'brand.neonYellow', // Input border is now neon yellow
            _focus: {
                borderColor: 'brand.neonYellow',
                boxShadow: '0 0 5px #FFFF00', // Neon yellow glow on focus
            },
            _placeholder: {
                color: 'brand.neonYellow',   // Placeholder also neon yellow
                opacity: 0.7
            }
        }
    }
  }
});

export default theme;
