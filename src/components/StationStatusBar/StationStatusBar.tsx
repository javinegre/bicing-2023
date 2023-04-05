import React, { FC } from 'react';
import Box from '@mui/material/Box/Box';
import { useTheme } from '@mui/material/styles';
import { Station } from 'src/types';

const StationStatusBar: FC<{ station: Station; size: 'default' | 'small' }> = (props) => {
  const { station, size } = props;

  const height = size === 'small' ? 2 : 4;

  const total = station.mechanical + station.electrical + station.docks;

  const getBarWidth: (num: number) => string = (num) => `${(num / total) * 100}%`;

  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex', width: '100%', height }}>
      <Box
        sx={{
          flexGrow: 1,
          width: getBarWidth(station.mechanical),
          backgroundColor: theme.palette.statusBar.mechanical,
        }}
      />
      <Box
        sx={{
          flexGrow: 1,
          width: getBarWidth(station.electrical),
          backgroundColor: theme.palette.statusBar.electrical,
        }}
      />
      <Box
        sx={{
          flexGrow: 1,
          width: getBarWidth(station.docks),
          backgroundColor: theme.palette.statusBar.docks,
        }}
      />
    </Box>
  );
};

export default StationStatusBar;
