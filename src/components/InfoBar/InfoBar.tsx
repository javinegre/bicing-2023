import React, { useMemo } from 'react';
import useStation from '@hooks/useStation';
import Box from '@mui/material/Box/Box';
import Paper from '@mui/material/Paper/Paper';
import { SxProps, Theme, alpha } from '@mui/material/styles';
import useTheme from '@mui/material/styles/useTheme';
import { ApiStationStatus } from '@store/api/api.types';
import { useAppSelector } from '@store/hooks';
import { mapCenterSelector } from '@store/map';
import { viewModeSelector } from '@store/ui';
import { isInNearbyArea } from '@utils/distance';

const sx: SxProps<Theme> = {
  position: 'absolute',
  top: 8,
  left: 8,
  right: 8,
  padding: 1,
  zIndex: 2,
};

const InfoBar = () => {
  const center = useAppSelector(mapCenterSelector);
  const viewMode = useAppSelector(viewModeSelector);
  const theme = useTheme();

  const stations = useStation();

  const totals = useMemo(() => {
    const activeNearByStations = stations?.filter(
      (station) => isInNearbyArea(station, center) && station.status === ApiStationStatus.active
    );

    return activeNearByStations?.reduce(
      (acc, station) => {
        return {
          docks: acc.docks + station.docks,
          mechanical: acc.mechanical + station.mechanical,
          electrical: acc.electrical + station.electrical,
        };
      },
      { docks: 0, mechanical: 0, electrical: 0 }
    );
  }, [stations, center]);

  sx.bgcolor = alpha(theme.palette.primary.dark, 0.92);
  sx.transform = viewMode === 'detail' ? 'translateY(-100px)' : 'translateY(0)';
  sx.transition = theme.transitions.create(['transform']);

  return (
    <Paper sx={sx} variant="elevation">
      {totals ? (
        <Box display="flex">
          <Box mr={2}>{totals.mechanical + totals.electrical} B</Box>
          <Box mr={1}>{totals.mechanical} M</Box>
          <Box mr={3}>{totals.electrical} E</Box>
          <Box>{totals.docks} D</Box>
        </Box>
      ) : null}
    </Paper>
  );
};

export default InfoBar;
