import React, { FC } from 'react';
import CustomStoreProvider from './providers/CustomStoreProvider';
import CustomThemeProvider from './providers/CustomThemeProvider';

type ProvidersProps = {
  children?: React.ReactNode;
};

const Providers: FC<ProvidersProps> = ({ children }) => (
  <CustomStoreProvider>
    <CustomThemeProvider>{children}</CustomThemeProvider>
  </CustomStoreProvider>
);

export default Providers;
