import React, { useMemo } from 'react';
import { isInNearbyArea } from './InfoBar.helpers';
import useStation from '@hooks/useStation';
import Paper from '@mui/material/Paper/Paper';
import { SxProps, Theme, alpha } from '@mui/material/styles';
import useTheme from '@mui/material/styles/useTheme';
import { StationStatusEnum } from '@store/api/api.slice';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { mapCenterSelector } from '@store/map';
import { selectedStationSelector, unselectStation } from '@store/ui';

const sx: SxProps<Theme> = {
  position: 'absolute',
  top: 8,
  left: 8,
  right: 8,
  padding: 1,
  zIndex: 2,
};

const InfoBar = () => {
  const selectedStation = useAppSelector(selectedStationSelector);
  const center = useAppSelector(mapCenterSelector);
  const theme = useTheme();

  const dispatch = useAppDispatch();

  const stations = useStation();

  const totals = useMemo(() => {
    const activeNearByStations = stations?.filter(
      (station) => isInNearbyArea(station, center) && station.status === StationStatusEnum.active
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

  sx.bgcolor = alpha(theme.palette.primary.dark, 0.95);

  return (
    <Paper sx={sx} variant="elevation">
      {totals ? (
        <>
          {totals.mechanical + totals.electrical} - {totals.mechanical} - {totals.electrical} -{' '}
          {totals.docks}
        </>
      ) : null}
      |{selectedStation}
      <span
        onClick={() => {
          dispatch(unselectStation());
        }}
      >
        X
      </span>
    </Paper>
  );
};

export default InfoBar;
