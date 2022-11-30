import React, { FC } from 'react';
import InfoBar from '../InfoBar/InfoBar';
import MapCanvas from '../MapCanvas/MapCanvas';
import MapControls from '../MapControls/MapControls';
import Box from '@mui/material/Box/Box';
import { SxProps, Theme } from '@mui/material/styles';
import { useAppSelector } from '@store/hooks';
import { selectedStationSelector } from '@store/ui';

const sx: SxProps<Theme> = { position: 'relative', width: '100vw' };

const Map: FC = () => {
  const selectedStation = useAppSelector(selectedStationSelector);

  sx.height = selectedStation !== null ? '50vh' : '100vh';

  return (
    <Box sx={sx}>
      <MapCanvas />
      <MapControls />
      <InfoBar />
    </Box>
  );
};

export default Map;
