import React from 'react';
import './App.css';
import DetailCard from './components/DetailCard/DetailCard';
import InfoBar from './components/InfoBar/InfoBar';
import Map from './components/Map/Map';
import { apiSlice } from './store/api/api.slice';
import Box from '@mui/material/Box/Box';
import { useAppDispatch } from '@store/hooks';

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
    <Box className="App" sx={{ position: 'relative' }}>
      <Map />
      <InfoBar />
      <DetailCard />
    </Box>
  );
};

export default App;
