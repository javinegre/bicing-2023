import React from 'react';
import './App.css';
import DetailCard from './components/DetailCard/DetailCard';
import InfoBar from './components/InfoBar/InfoBar';
import Map from './components/Map/Map';
import SnackbarProvider from './providers/SnackbarProvider';
import { apiSlice } from './store/api/api.slice';
import AppErrorMessage from '@components/AppErrorMessage/AppErrorMessage';
import AppModal from '@components/AppModal/AppModal';
import Box from '@mui/material/Box/Box';
import { SxProps, Theme } from '@mui/material/styles';
import { useAppDispatch } from '@store/hooks';

const sx: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const sxAppWrapper: SxProps<Theme> = {
  position: 'relative',
  width: '100%',
  height: '100%',
  maxWidth: 450,
  maxHeight: 1000,
  overflow: 'hidden',
};

const App = () => {
  const appDispatch = useAppDispatch();

  appDispatch(
    apiSlice.endpoints.stationInfo.initiate('station-info', {
      subscriptionOptions: { pollingInterval: 60 * 60 * 1000 }, // 1h
    })
  );
  appDispatch(
    apiSlice.endpoints.stationStatus.initiate('station-status', {
      subscriptionOptions: { pollingInterval: 30 * 1000 }, // 30s
    })
  );

  return (
    <Box className="App" sx={sx}>
      <Box sx={sxAppWrapper}>
        <Map />
        <InfoBar />
        <DetailCard />
        <SnackbarProvider />
        <AppModal />
        <AppErrorMessage />
      </Box>
    </Box>
  );
};

export default App;
