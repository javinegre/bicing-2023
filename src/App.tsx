import React from 'react';
import Map from './components/Map/Map';
import { apiSlice } from './store/api/api.slice';
import { useAppDispatch } from '@store/hooks';

const App = () => {
  const appDispatch = useAppDispatch();

  appDispatch(
    apiSlice.endpoints.stationInfo.initiate('station-info', {
      subscriptionOptions: { pollingInterval: 60 * 60 * 1000 },
    })
  );
  appDispatch(
    apiSlice.endpoints.stationStatus.initiate('station-status', {
      subscriptionOptions: { pollingInterval: 60 * 1000 },
    })
  );

  return (
    <div className="App">
      <h1>Bicing</h1>
      <Map />
    </div>
  );
};

export default App;
