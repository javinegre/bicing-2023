import React from 'react';
import Map from './components/Map/Map';
import { apiSlice } from './store/api/api.slice';
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
    <div className="App">
      <Map />
    </div>
  );
};

export default App;
