'use client'

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(245, 245, 245)',
    },
    secondary: {
      main: 'rgb(230, 75, 61)',
    }
  }
});

const MuiThemeProvider = (
  {children}: {children: React.ReactNode}
) => {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
}

export default MuiThemeProvider;