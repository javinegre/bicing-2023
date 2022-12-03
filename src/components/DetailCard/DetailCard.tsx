import React, { useEffect, useMemo, useRef } from 'react';
import { getStationList } from './DetailCard.helpers';
import StationDetail from '@components/StationDetail/StationDetail';
import StationList from '@components/StationList/StationList';
import useStation from '@hooks/useStation';
import Box from '@mui/material/Box/Box';
import Card from '@mui/material/Card/Card';
import IconButton from '@mui/material/IconButton/IconButton';
import Typography from '@mui/material/Typography/Typography';
import { SxProps, Theme, alpha, useTheme } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { selectedStationSelector, unselectStation, viewModeSelector } from '@store/ui';

const sx: SxProps<Theme> = {
  position: 'absolute',
  top: '50%',
  height: 'calc(50% - 8px)',
  left: 8,
  right: 8,
  display: 'flex',
  flexDirection: 'column',
  px: 2,
  py: 1,
  zIndex: 5,
};

const DetailCard = () => {
  const selectedStation = useAppSelector(selectedStationSelector);
  const viewMode = useAppSelector(viewModeSelector);
  const dispatch = useAppDispatch();

  const listRef = useRef<HTMLDivElement | null>(null);

  const stations = useStation();

  const theme = useTheme();

  useEffect(() => {
    if (listRef.current?.scrollTop) {
      // Reset scroll when data changes
      listRef.current.scrollTop = 0;
    }
  }, [selectedStation]);

  const stationList = useMemo(
    () => getStationList(selectedStation, stations),
    [selectedStation, stations]
  );

  sx.bgcolor = alpha(theme.palette.background.default, 0.98);
  sx.transform = viewMode === 'detail' ? 'translateY(0)' : 'translateY(120%)';
  sx.transition = theme.transitions.create(['transform']);

  const nearbyStations = stationList?.nearby ?? [];
  const otherStations = (stationList?.other ?? []).slice(0, 20);

  return (
    <Card sx={sx}>
      {selectedStation ? (
        <Box
          sx={{
            mb: 3,
          }}
        >
          <StationDetail station={selectedStation} />
        </Box>
      ) : null}
      <Box ref={listRef} sx={{ overflowY: 'scroll' }}>
        {nearbyStations?.length ? (
          <StationList title="Closest Stations" list={nearbyStations} />
        ) : null}
        {otherStations?.length ? <StationList title="Other Stations" list={otherStations} /> : null}
      </Box>
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
