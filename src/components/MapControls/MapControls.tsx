import React from 'react';
import MapZoom from '@components/MapZoom/MapZoom';
import Box from '@mui/material/Box/Box';
import { SxProps, Theme } from '@mui/material/styles';
import { useAppSelector } from '@store/hooks';
import { viewModeSelector } from '@store/ui';

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
  const viewMode = useAppSelector(viewModeSelector);

  return <Box sx={sx}>{viewMode === 'default' ? <MapZoom /> : null}</Box>;
};

export default MapControls;
