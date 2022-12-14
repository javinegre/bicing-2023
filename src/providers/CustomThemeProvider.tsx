import React, { FC } from 'react';
import { StyledEngineProvider, Theme, ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import themeDark from '@themes/theme.dark';

declare module '@mui/material/styles' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

type CustomThemeProviderProps = {
  children?: React.ReactNode;
};

const CustomThemeProvider: FC<CustomThemeProviderProps> = ({ children }) => (
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={createTheme(themeDark)}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  </StyledEngineProvider>
);

export default CustomThemeProvider;
