import React, { FC } from 'react';
import BikeSvgIcon from '@assets/icons/ui/bike.svg?raw';
import BoltSvgIcon from '@assets/icons/ui/bolt.svg?raw';
import BriefcaseSvgIcon from '@assets/icons/ui/briefcase.svg?raw';
import CloseSvgIcon from '@assets/icons/ui/close.svg?raw';
import GearsSvgIcon from '@assets/icons/ui/gears.svg?raw';
import HomeSvgIcon from '@assets/icons/ui/home.svg?raw';
import ParkingSvgIcon from '@assets/icons/ui/parking.svg?raw';
import SettingsSvgIcon from '@assets/icons/ui/settings.svg?raw';
import StarSvgIcon from '@assets/icons/ui/star.svg?raw';
import UserLocationSvgIcon from '@assets/icons/ui/user-location.svg?raw';
import Box from '@mui/material/Box/Box';
import { SxProps, Theme, useTheme } from '@mui/material/styles';

type Icon =
  | 'bike'
  | 'bolt'
  | 'briefcase'
  | 'close'
  | 'gears'
  | 'home'
  | 'parking'
  | 'settings'
  | 'star'
  | 'user-location';

const config: Record<Icon, string> = {
  bike: BikeSvgIcon,
  bolt: BoltSvgIcon,
  briefcase: BriefcaseSvgIcon,
  close: CloseSvgIcon,
  gears: GearsSvgIcon,
  home: HomeSvgIcon,
  parking: ParkingSvgIcon,
  settings: SettingsSvgIcon,
  star: StarSvgIcon,
  ['user-location']: UserLocationSvgIcon,
};

const CustomSvgIcon: FC<{
  icon: Icon;
  pathFill?: string;
  size?: string | number;
  sx?: SxProps<Theme>;
}> = (props) => {
  const { icon, pathFill, size, sx: sxProps } = props;
  const defaultSize = '24px';

  const theme = useTheme();
  const svg = config[icon];

  const sizeSx = size
    ? {
        width: `${+size}px`,
        minWidth: `${+size}px`,
        height: `${+size}px`,
        minHeight: `${+size}px`,
      }
    : { width: defaultSize, minWidth: defaultSize, height: defaultSize, minHeight: defaultSize };
  const pathFillSx = pathFill ? { path: { fill: pathFill } } : {};

  const _sx = {
    fill: theme.palette.text.primary,
    ...pathFillSx,
    ...sizeSx,
    ...sxProps,
  };

  return (
    <Box display="flex" position="relative" sx={_sx} dangerouslySetInnerHTML={{ __html: svg }} />
  );
};

export default CustomSvgIcon;
