import React from 'react';
import MapFilters from '@components/MapFilters/MapFilters';
import MapZoom from '@components/MapZoom/MapZoom';
import Box from '@mui/material/Box/Box';
import { SxProps, Theme } from '@mui/material/styles';
import { useAppSelector } from '@store/hooks';
import { viewModeSelector } from '@store/ui';

const sx: SxProps<Theme> = {
  position: 'absolute',
  bottom: 0,
  left: 8,
  right: 8,
  zIndex: 6,
  pointerEvents: 'none',
};

const MapControls = () => {
  const viewMode = useAppSelector(viewModeSelector);

  sx.top = viewMode === 'default' ? 64 : 8;

  return (
    <Box sx={sx}>
      <>
        <Box display="flex" justifyContent="flex-end" mb={1} sx={{ pointerEvents: 'auto' }}>
          <MapFilters />
        </Box>
        {viewMode === 'default' ? (
          <Box display="flex" justifyContent="flex-end">
            <MapZoom />
          </Box>
        ) : null}
      </>
    </Box>
  );
};

export default MapControls;
