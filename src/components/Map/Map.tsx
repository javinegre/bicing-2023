import React, { FC } from 'react';
import MapCanvas from '@components/MapCanvas/MapCanvas';
import MapControls from '@components/MapControls/MapControls';
import MapHints from '@components/MapHints/MapHints';
import Box from '@mui/material/Box/Box';
import { SxProps, Theme } from '@mui/material/styles';
import { useAppSelector } from '@store/hooks';
import { selectedStationSelector } from '@store/ui';

const sx: SxProps<Theme> = { position: 'relative', width: '100vw', height: '100vh' };

const Map: FC = () => {
  const selectedStation = useAppSelector(selectedStationSelector);

  const mapAreaHeight = selectedStation !== null ? '50vh' : '100vh';

  return (
    <Box sx={sx}>
      <MapCanvas />
      <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: mapAreaHeight }}>
        <MapHints />
        <MapControls />
      </Box>
    </Box>
  );
};

export default Map;
