import React from 'react';
import MapZoom from '../MapZoom/MapZoom';
import Box from '@mui/material/Box/Box';
import { SxProps, Theme } from '@mui/material/styles';

const sx: SxProps<Theme> = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 2,
  pointerEvents: 'none',
};

const MapControls = () => {
  return (
    <Box sx={sx}>
      <MapZoom />
    </Box>
  );
};

export default MapControls;
