import React, { FC } from 'react';
import CustomSvgIcon from '@components/Icons/CustomSvgIcon';
import StationStatusBar from '@components/StationStatusBar/StationStatusBar';
import Box from '@mui/material/Box/Box';
import Typography from '@mui/material/Typography/Typography';
import { Station } from 'src/types';

interface StationDetailProps {
  station: Station;
}

const StationDetail: FC<StationDetailProps> = (props) => {
  const { station } = props;

  const iconOpacity = 0.5;

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex' }}>
          <Box display="flex" alignItems="center" mr={1}>
            <Typography fontSize="1.8em">{station.mechanical + station.electrical}</Typography>
            <CustomSvgIcon
              icon="bike"
              size={24}
              sx={{ position: 'relative', top: 1, ml: 0.5, opacity: iconOpacity }}
            />
          </Box>
          <Box display="flex" alignItems="center" mr={1}>
            <Typography fontSize="1.2em">{station.mechanical}</Typography>
            <CustomSvgIcon icon="gears" size={12} sx={{ ml: 0.5, opacity: iconOpacity }} />
          </Box>
          <Box display="flex" alignItems="center">
            <Typography fontSize="1.2em">{station.electrical}</Typography>
            <CustomSvgIcon icon="bolt" size={12} sx={{ ml: 0.2, opacity: iconOpacity }} />
          </Box>
        </Box>
        <Box display="flex" alignItems="center">
          <Typography fontSize="1.8em">{station.docks}</Typography>
          <CustomSvgIcon
            icon="parking"
            size={20}
            sx={{ position: 'relative', top: 1, opacity: iconOpacity }}
          />
        </Box>
      </Box>
      <StationStatusBar station={station} size="default" />
      <Typography variant="h6">{station.name}</Typography>
    </>
  );
};

export default StationDetail;
