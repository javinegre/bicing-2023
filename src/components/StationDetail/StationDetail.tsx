import React, { FC } from 'react';
import StationStatusBar from '@components/StationStatusBar/StationStatusBar';
import Box from '@mui/material/Box/Box';
import Typography from '@mui/material/Typography/Typography';
import { Station } from 'src/types';

interface StationDetailProps {
  station: Station;
}

const StationDetail: FC<StationDetailProps> = (props) => {
  const { station } = props;

  return (
    <>
      <Typography variant="h6">{station.name}</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex' }}>
          <Typography variant="h5" mr={2}>
            {station.mechanical + station.electrical} B
          </Typography>
          <Typography variant="h6" mr={1}>
            {station.mechanical} M
          </Typography>
          <Typography variant="h6">{station.electrical} E</Typography>
        </Box>
        <Box>
          <Typography variant="h5">{station.docks} D</Typography>
        </Box>
      </Box>
      <StationStatusBar station={station} size="default" />
    </>
  );
};

export default StationDetail;
