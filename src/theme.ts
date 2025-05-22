import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        bg: '#121212',
        color: '#e0e0e0',
      },
    },
  },
  colors: {
    dark: {
      50: '#f5f5f5',
      100: '#e0e0e0',
      200: '#c2c2c2',
      300: '#a3a3a3',
      400: '#858585',
      500: '#666666',
      600: '#4a4a4a',
      700: '#333333',
      800: '#212121',
      900: '#121212',
    },
    accent: {
      50: '#e3f2fd',
      100: '#bbdefb',
      200: '#90caf9',
      300: '#64b5f6',
      400: '#42a5f5',
      500: '#2196f3',
      600: '#1e88e5',
      700: '#1976d2',
      800: '#1565c0',
      900: '#0d47a1',
    },
  },
  components: {
    Container: {
      baseStyle: {
        maxW: 'container.md',
      },
    },
    Textarea: {
      variants: {
        outline: {
          _focus: {
            borderColor: 'accent.500',
            boxShadow: '0 0 0 1px var(--chakra-colors-accent-500)',
          },
        },
      },
    },
    IconButton: {
      variants: {
        ghost: {
          _hover: {
            bg: 'dark.700',
          },
          _active: {
            bg: 'dark.600',
          },
        },
      },
    },
  },
});

export default theme; 