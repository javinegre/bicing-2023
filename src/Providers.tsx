import React, { FC } from 'react';
import CustomThemeProvider from './providers/CustomThemeProvider';

type ProvidersProps = {
  children?: React.ReactNode;
};

const Providers: FC<ProvidersProps> = ({ children }) => (
  <CustomThemeProvider>{children}</CustomThemeProvider>
);

export default Providers;
