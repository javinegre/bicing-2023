import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { store } from '@store/store';

type CustomStoreProviderProps = {
  children?: React.ReactNode;
};

const CustomStoreProvider: FC<CustomStoreProviderProps> = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

export default CustomStoreProvider;
