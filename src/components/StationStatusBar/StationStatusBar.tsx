import React, { FC } from 'react';
import Box from '@mui/material/Box/Box';
import { Station } from 'src/types';

const StationStatusBar: FC<{ station: Station; size: 'default' | 'small' }> = (props) => {
  const { station, size } = props;

  const height = size === 'small' ? 2 : 4;

  const total = station.mechanical + station.electrical + station.docks;

  const getBarWidth: (num: number) => string = (num) => `${(num / total) * 100}%`;

  return (
    <Box sx={{ display: 'flex', width: '100%', height }}>
      <Box
        sx={{
          flexGrow: 1,
          width: getBarWidth(station.mechanical),
          backgroundColor: '#FF0000',
          // TODO
          //   backgroundColor: appConfig.stationStatusBarColor.mechanical,
        }}
      />
      <Box
        sx={{
          flexGrow: 1,
          width: getBarWidth(station.electrical),
          backgroundColor: '#FFCC00',
          // TODO
          //   backgroundColor: appConfig.stationStatusBarColor.electrical,
        }}
      />
      <Box
        sx={{
          flexGrow: 1,
          width: getBarWidth(station.docks),
          backgroundColor: '#808080',
          // TODO
          //   backgroundColor: appConfig.stationStatusBarColor.docks,
        }}
      />
    </Box>
  );
};

export default StationStatusBar;
