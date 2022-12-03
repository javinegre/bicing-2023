import React, { FC } from 'react';
import StationStatusBar from '@components/StationStatusBar/StationStatusBar';
import Box from '@mui/material/Box/Box';
import List from '@mui/material/List/List';
import ListItem from '@mui/material/ListItem/ListItem';
import Typography from '@mui/material/Typography/Typography';
import { useAppDispatch } from '@store/hooks';
import { selectStation } from '@store/ui';
import { Station } from 'src/types';

interface StationListProps {
  title: string;
  list: Station[];
}

const StationList: FC<StationListProps> = (props) => {
  const { title, list } = props;

  const dispatch = useAppDispatch();

  return (
    <>
      <Typography sx={{ opacity: 0.5 }}>{title}</Typography>
      <List>
        {list.map((station) => (
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
    </>
  );
};

export default StationList;
