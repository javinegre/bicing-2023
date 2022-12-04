import React, { FC } from 'react';
import BikeIconSvg from '@assets/icons/ui/bike.svg?raw';
import BoltIconSvg from '@assets/icons/ui/bolt.svg?raw';
import GearsIconSvg from '@assets/icons/ui/gears.svg?raw';
import ParkingIconSvg from '@assets/icons/ui/parking.svg?raw';
import Box from '@mui/material/Box/Box';
// import { SxProps, Theme } from '@mui/material/styles';
import { SxProps, Theme, useTheme } from '@mui/material/styles';

// import { useTheme } from '@emotion/react';

type Icon = 'bike' | 'bolt' | 'gears' | 'parking';

const config: Record<Icon, string> = {
  bike: BikeIconSvg,
  bolt: BoltIconSvg,
  gears: GearsIconSvg,
  parking: ParkingIconSvg,
};

const CustomSvgIcon: FC<{ icon: Icon; size?: number; sx?: SxProps<Theme> | undefined }> = (
  props
) => {
  const { icon, size, sx } = props;

  const theme = useTheme();
  const svg = config[icon];

  const sizeSx = size
    ? {
        width: size,
        height: size,
      }
    : { width: 24, height: 24 };

  const _sx = { fill: theme.palette.text.icon, ...sizeSx, ...sx };

  return <Box display="flex" sx={_sx} dangerouslySetInnerHTML={{ __html: svg }} />;
};

export default CustomSvgIcon;
