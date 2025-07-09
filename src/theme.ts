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
      500: '#FF00FF', // Neon Magenta (your primary neon color)
      600: '#FF00CC', // Slightly darker magenta
      700: '#CC0099', // Even darker magenta
      800: '#990066', // Dark Magenta
      900: '#660033', // Very Dark Magenta
    },
    glow: { // Additional colors specifically for glow effects if needed
      pink: '#FF00FF',
      blue: '#00FFFF',
      green: '#00FF00',
    }
  },
  components: {
    Heading: {
      baseStyle: {
        // This applies to all Heading components
        textShadow: '0 0 5px #FF00FF, 0 0 10px #FF00FF, 0 0 15px #FF00FF, 0 0 20px #FF00FF, 0 0 25px #FF00FF, 0 0 30px #FF00FF, 0 0 35px #FF00FF',
      },
    },
    Button: {
      variants: {
        neon: { // Custom 'neon' variant for buttons (you'll use this like <Button variant="neon">)
          bg: 'brand.500',
          color: 'white',
          boxShadow: '0 0 5px #FF00FF, 0 0 10px #FF00FF, 0 0 15px #FF00FF',
          _hover: {
            bg: 'brand.600',
            boxShadow: '0 0 8px #FF00FF, 0 0 15px #FF00FF, 0 0 25px #FF00FF',
          },
        },
      },
    },
    Input: {
        baseStyle: { // Custom base styles for Input components
            borderColor: 'brand.500', // Neon border color
            _focus: { // Style when input is focused
                borderColor: 'brand.500', // Keep border color on focus
                boxShadow: '0 0 5px #FF00FF', // Add a subtle glow on focus
            }
        }
    }
  }
});

export default theme;