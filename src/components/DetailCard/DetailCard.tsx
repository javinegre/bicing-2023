import React, { useEffect, useMemo, useRef } from 'react';
import { getStationList } from './DetailCard.helpers';
import StationDetail from '@components/StationDetail/StationDetail';
import StationList from '@components/StationList/StationList';
import useStation from '@hooks/useStation';
import Box from '@mui/material/Box/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer/SwipeableDrawer';
import { SxProps, Theme, alpha, useTheme } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { selectedStationSelector, unselectStation, viewModeSelector } from '@store/ui';

const sx: SxProps<Theme> = {
  marginBottom: 1,
  height: 'calc(50% - 8px)',
  left: 8,
  right: 8,
  px: 2,
  py: 1,
  display: 'flex',
  borderRadius: 1,
  pointerEvents: 'auto',
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
    <React.Fragment>
      <SwipeableDrawer
        elevation={0}
        PaperProps={{
          sx,
        }}
        slotProps={{
          root: { style: { pointerEvents: 'none' } },
        }}
        anchor="bottom"
        hideBackdrop
        open={viewMode === 'detail'}
        onClose={() => {
          dispatch(unselectStation());
        }}
        onOpen={() => undefined}
      >
        <Box display="flex" justifyContent="center">
          <Box
            sx={{
              width: 50,
              height: 4,
              mb: 1,
              bgcolor: '#505050',
              borderRadius: 1,
              cursor: 'pointer',
            }}
            onClick={() => {
              dispatch(unselectStation());
            }}
          />
        </Box>
        {selectedStation ? (
          <Box sx={{ mb: 3 }}>
            <StationDetail stationId={selectedStation.id} />
          </Box>
        ) : null}
        <Box ref={listRef} sx={{ overflowY: 'scroll', '-webkit-overflow-scrolling': 'touch' }}>
          {nearbyStations?.length ? (
            <StationList title="Closest Stations" list={nearbyStations} />
          ) : null}
          {otherStations?.length ? (
            <StationList title="Other Stations" list={otherStations} />
          ) : null}
        </Box>
      </SwipeableDrawer>
    </React.Fragment>
  );
};

export default DetailCard;
