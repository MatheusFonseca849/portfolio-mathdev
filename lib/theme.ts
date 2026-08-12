import { createTheme } from '@mui/material/styles';

export const getTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'dark' ? '#30a554' : '#005800',
      },
      background: {
        default: mode === 'dark' ? '#2a272a' : '#f6edd9',
        paper: mode === 'dark' ? '#353035' : '#faf7ff',
      },
      text: {
        primary: mode === 'dark' ? '#F0F0F0' : '#2a272a',
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
  });
