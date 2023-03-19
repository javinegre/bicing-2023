import React, { FC } from 'react';
import StationListItem from '@components/StationListItem/StationListItem';
import List from '@mui/material/List/List';
import Typography from '@mui/material/Typography/Typography';
import { Station } from 'src/types';

interface StationListProps {
  title: string;
  list: Station[];
}

const StationList: FC<StationListProps> = (props) => {
  const { title, list } = props;

  return (
    <>
      <Typography sx={{ opacity: 0.5 }} variant="condensed">
        {title}
      </Typography>
      <List>
        {list.map((station) => (
          <StationListItem station={station} key={station.id} />
        ))}
      </List>
    </>
  );
};

export default StationList;
