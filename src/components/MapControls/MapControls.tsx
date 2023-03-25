import React from 'react';
import MapBookmark from '@components/MapBookmark/MapBookmark';
import MapFilters from '@components/MapFilters/MapFilters';
import MapGeoLocation from '@components/MapGeoLocation/MapGeoLocation';
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
        <Box display="flex" flexDirection="column" alignItems="flex-end">
          <MapGeoLocation />
          <MapBookmark type="home" />
          <MapBookmark type="work" />
          <MapBookmark type="favorite" />
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
