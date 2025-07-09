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

      blueNeon: '#00FFFF',  // Cyan/Aqua (used for join button)
      greenNeon: '#00FF00', // Lime Green (used for join button)

      // --- NEW: Primary Blue Neon ---
      primaryBlueNeon: '#00BFFF', // Deep Sky Blue - a vibrant blue neon
      // --- ---------------------- ---

      neonYellow: '#FFFF00', // <--- NEW: Neon Yellow for input text
    },
    glow: {
      pink: '#FF00FF',
      blue: '#00FFFF',
      green: '#00FF00',
      primaryBlue: '#00BFFF', // Add primary blue to glow
      yellow: '#FFFF00', // Add yellow to glow
    }
  },
  components: {
    Heading: {
      baseStyle: {
        // Keep magenta for the main title, or change to primaryBlueNeon if preferred
        textShadow: '0 0 5px #FF00FF, 0 0 10px #FF00FF, 0 0 15px #FF00FF, 0 0 20px #FF00FF, 0 0 25px #FF00FF, 0 0 30px #FF00FF, 0 0 35px #FF00FF',
      },
    },
    Button: {
      variants: {
        neon: { // Magenta button (CREATE NEW ROOM)
          bg: 'transparent', // Make background transparent like the others
          color: 'brand.500',
          border: '2px solid',
          borderColor: 'brand.500',
          boxShadow: '0 0 5px #FF00FF, 0 0 10px #FF00FF, 0 0 15px #FF00FF',
          _hover: {
            bg: 'rgba(255, 0, 255, 0.1)',
            boxShadow: '0 0 8px #FF00FF, 0 0 15px #FF00FF, 0 0 25px #FF00FF',
          },
        },
        neonBlue: { // Cyan/Aqua button
          bg: 'transparent',
          color: 'brand.blueNeon',
          border: '2px solid',
          borderColor: 'brand.blueNeon',
          boxShadow: '0 0 5px #00FFFF, 0 0 10px #00FFFF, 0 0 15px #00FFFF',
          _hover: {
            bg: 'rgba(0, 255, 255, 0.1)',
            boxShadow: '0 0 8px #00FFFF, 0 0 15px #00FFFF, 0 0 25px #00FFFF',
          },
        },
        neonGreen: { // Lime Green button (JOIN ROOM)
          bg: 'transparent',
          color: 'brand.greenNeon',
          border: '2px solid',
          borderColor: 'brand.greenNeon',
          boxShadow: '0 0 5px #00FF00, 0 0 10px #00FF00, 0 0 15px #00FF00',
          _hover: {
            bg: 'rgba(0, 255, 0, 0.1)',
            boxShadow: '0 0 8px #00FF00, 0 0 15px #00FF00, 0 0 25px #00FF00',
          },
        },
        // --- NEW: Primary Blue Neon Button Variant ---
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
        // --- ------------------------------------- ---
      },
    },
    Input: {
        baseStyle: {
            color: 'brand.neonYellow', // <--- Input text color is now neon yellow
            borderColor: 'brand.primaryBlueNeon', // <--- Input border is now primary blue neon
            _focus: {
                borderColor: 'brand.primaryBlueNeon',
                boxShadow: '0 0 5px #00BFFF',
            },
            _placeholder: { // <--- Style for placeholder text
                color: 'brand.neonYellow', // Placeholder also neon yellow
                opacity: 0.7 // Make it slightly transparent
            }
        }
    }
  }
});

export default theme;
