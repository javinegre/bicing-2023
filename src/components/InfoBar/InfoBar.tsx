import React, { useMemo } from 'react';
import { getResourceTotals } from './InfoBar.helpers';
import CustomSvgIcon from '@components/Icons/CustomSvgIcon';
import useStation from '@hooks/useStation';
import Box from '@mui/material/Box/Box';
import Paper from '@mui/material/Paper/Paper';
import Typography from '@mui/material/Typography/Typography';
import { SxProps, Theme, alpha } from '@mui/material/styles';
import useTheme from '@mui/material/styles/useTheme';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { mapCenterSelector } from '@store/map';
import { openModal, viewModeSelector } from '@store/ui';

const sx: SxProps<Theme> = {
  position: 'absolute',
  top: 8,
  left: 8,
  right: 8,
  px: 1.5,
  py: 0.5,
  zIndex: 2,
};

const InfoBar = () => {
  const dispatch = useAppDispatch();
  const center = useAppSelector(mapCenterSelector);
  const viewMode = useAppSelector(viewModeSelector);
  const theme = useTheme();

  const stations = useStation();

  const totals = useMemo(() => getResourceTotals(stations, center), [stations, center]);

  sx.bgcolor = alpha(theme.palette.primary.dark, 0.92);
  sx.transform = viewMode === 'detail' ? 'translateY(-100px)' : 'translateY(0)';
  sx.transition = theme.transitions.create(['transform']);

  const iconOpacity = 0.6;

  const _openAppModal = () => {
    dispatch(openModal());
  };

  return (
    <Paper sx={sx} variant="elevation">
      {totals ? (
        <Box display="flex" justifyContent="space-between">
          <Box display="flex">
            <Box display="flex" alignItems="center" mr={1}>
              <Typography fontSize="1.5em">{totals.mechanical + totals.electrical}</Typography>
              <CustomSvgIcon
                icon="bike"
                size={24}
                sx={{ position: 'relative', top: 1, ml: 0.5, opacity: iconOpacity }}
              />
            </Box>
            <Box display="flex" alignItems="center" mr={1}>
              <Typography>{totals.mechanical}</Typography>
              <CustomSvgIcon
                icon="gears"
                size={12}
                sx={{ position: 'relative', top: 1, ml: 0.5, opacity: iconOpacity }}
              />
            </Box>
            <Box display="flex" alignItems="center" mr={2}>
              <Typography>{totals.electrical}</Typography>
              <CustomSvgIcon
                icon="bolt"
                size={12}
                sx={{ position: 'relative', top: 1, ml: 0.2, opacity: iconOpacity }}
              />
            </Box>
            <Box display="flex" alignItems="center">
              <Typography fontSize="1.5em">{totals.docks}</Typography>
              <CustomSvgIcon
                icon="parking"
                size={20}
                sx={{ position: 'relative', top: 1, opacity: iconOpacity }}
              />
            </Box>
          </Box>
          <Box onClick={_openAppModal}>Settings</Box>
        </Box>
      ) : null}
    </Paper>
  );
};

export default InfoBar;
