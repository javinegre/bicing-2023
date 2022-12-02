import React, { useMemo } from 'react';
import StationStatusBar from '@components/StationStatusBar/StationStatusBar';
import useStation from '@hooks/useStation';
import Box from '@mui/material/Box/Box';
import Card from '@mui/material/Card/Card';
import IconButton from '@mui/material/IconButton/IconButton';
import List from '@mui/material/List/List';
import ListItem from '@mui/material/ListItem/ListItem';
import Typography from '@mui/material/Typography/Typography';
import { SxProps, Theme, alpha, useTheme } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import {
  selectStation,
  selectedStationSelector,
  unselectStation,
  viewModeSelector,
} from '@store/ui';
import { getStationDistance, isInNearbyArea } from '@utils/distance';
import type { Station } from 'src/types';

const sx: SxProps<Theme> = {
  position: 'absolute',
  top: '50vh',
  height: 'calc(50vh - 8px)',
  left: 8,
  right: 8,
  px: 2,
  py: 1,
  overflowY: 'auto',
  zIndex: 5,
};

const DetailCard = () => {
  const selectedStation = useAppSelector(selectedStationSelector);
  const viewMode = useAppSelector(viewModeSelector);

  const stations = useStation();

  const nearbyStations = useMemo(() => {
    const center = { lat: selectedStation?.lat ?? 0, lng: selectedStation?.lng ?? 0 };

    return stations?.reduce<(Station & { distance: number })[]>((acc, station) => {
      if (isInNearbyArea(station, center) && station.id !== selectedStation?.id) {
        return [...acc, { ...station, distance: getStationDistance(station, center) }];
      }

      return acc;
    }, []);
  }, [selectedStation, stations]);

  const dispatch = useAppDispatch();
  const theme = useTheme();

  sx.bgcolor = alpha(theme.palette.background.default, 0.98);
  sx.transform = viewMode === 'detail' ? 'translateY(0)' : 'translateY(60vh)';
  sx.transition = theme.transitions.create(['transform']);

  return (
    <Card sx={sx}>
      {selectedStation ? (
        <Box sx={{ mb: 1 }}>
          <Typography variant="h6">{selectedStation.name}</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex' }}>
              <Typography variant="h5" mr={2}>
                {selectedStation.mechanical + selectedStation.electrical} B
              </Typography>
              <Typography variant="h6" mr={1}>
                {selectedStation.mechanical} M
              </Typography>
              <Typography variant="h6">{selectedStation.electrical} E</Typography>
            </Box>
            <Box>
              <Typography variant="h5">{selectedStation.docks} D</Typography>
            </Box>
          </Box>
          <StationStatusBar station={selectedStation} size="default" />
        </Box>
      ) : null}
      {nearbyStations?.length ? (
        <List>
          {nearbyStations.map((station) => (
            <ListItem
              key={station.id}
              sx={{ display: 'flex', px: 0 }}
              onClick={() => dispatch(selectStation(station))}
            >
              <Box sx={{ width: '35%' }}>
                <Typography variant="body2" noWrap>
                  {station.name}
                </Typography>
              </Box>
              <Box sx={{ width: '65%', pl: 2 }}>
                <StationStatusBar station={station} size="small" />
              </Box>
            </ListItem>
          ))}
        </List>
      ) : null}
      <IconButton
        sx={{ position: 'absolute', top: 0, right: 0 }}
        color="primary"
        onClick={() => {
          dispatch(unselectStation());
        }}
      >
        <Typography>&times;</Typography>
      </IconButton>
    </Card>
  );
};

export default DetailCard;
