import React from 'react';
import Providers from './Providers';
import Map from './components/Map/Map';

const App = () => {
  return (
    <Providers>
      <div className="App">
        <h1>Bicing</h1>
        <Map />
      </div>
    </Providers>
  );
};

export default App;
