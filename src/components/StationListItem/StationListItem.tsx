import React, { FC, useCallback } from 'react';
import StationStatusBar from '@components/StationStatusBar/StationStatusBar';
import Box from '@mui/material/Box/Box';
import ListItem from '@mui/material/ListItem/ListItem';
import Typography from '@mui/material/Typography/Typography';
import { useAppDispatch } from '@store/hooks';
import { selectStation } from '@store/ui';
import { Station } from 'src/types';

interface StationListItemProps {
  station: Station;
}

const StationListItem: FC<StationListItemProps> = (props) => {
  const { station } = props;

  const dispatch = useAppDispatch();

  const _onClick = useCallback(() => dispatch(selectStation(station)), [station]);

  return (
    <ListItem
      sx={{
        display: 'flex',
        px: 0,
        letterSpacing: '-0.02em',
        cursor: 'pointer',
        userSelect: 'none',
      }}
      onClick={_onClick}
    >
      <Box sx={{ width: '35%' }}>
        <Typography variant="condensed" noWrap>
          {station.name}
        </Typography>
      </Box>
      <Box sx={{ width: '65%', pl: 2 }}>
        <StationStatusBar station={station} size="small" />
      </Box>
    </ListItem>
  );
};

export default StationListItem;
