import React, { useMemo } from 'react';
import { getResourceTotals } from './InfoBar.helpers';
import CustomSvgIcon from '@components/Icons/CustomSvgIcon';
import useStation from '@hooks/useStation';
import Box from '@mui/material/Box/Box';
import Button from '@mui/material/Button/Button';
import Paper from '@mui/material/Paper/Paper';
import Typography from '@mui/material/Typography/Typography';
import { SxProps, Theme } from '@mui/material/styles';
import useTheme from '@mui/material/styles/useTheme';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { mapCenterSelector } from '@store/map';
import { openModal, viewModeSelector } from '@store/ui';
import { bikeTypeFilterSelector, resourceShownSelector } from '@store/ui';
import { BikeTypeFilterEnum, StationResourceTypeEnum } from 'src/types';

const InfoBar = () => {
  const dispatch = useAppDispatch();
  const center = useAppSelector(mapCenterSelector);
  const viewMode = useAppSelector(viewModeSelector);
  const resourceShown = useAppSelector(resourceShownSelector);
  const bikeTypeFilter = useAppSelector(bikeTypeFilterSelector);
  const theme = useTheme();

  const stations = useStation();

  const totals = useMemo(() => getResourceTotals(stations, center), [stations, center]);

  const sx: SxProps<Theme> = useMemo(
    () => ({
      position: 'absolute',
      top: 8,
      left: 8,
      right: 8,
      minHeight: 44,
      px: 1.5,
      py: 0.5,
      zIndex: 2,
      bgcolor: theme.palette.primary.main,
      background: theme.palette.gradients.main,
      transform: viewMode === 'detail' ? 'translateY(-100px)' : 'translateY(0)',
      transition: theme.transitions.create(['transform']),
    }),
    [theme, viewMode]
  );

  const iconOpacity = 0.4;

  const _openAppModal = () => {
    dispatch(openModal());
  };

  return (
    <Paper sx={sx} variant="elevation">
      <Box display="flex" justifyContent="space-between">
        <Box display="flex">
          {totals ? (
            <>
              <Box display="flex" alignItems="center" mr={1}>
                <Typography
                  fontSize="1.5em"
                  sx={{
                    opacity:
                      resourceShown === StationResourceTypeEnum.bikes && bikeTypeFilter === null
                        ? 1
                        : iconOpacity,
                  }}
                >
                  {totals.mechanical + totals.electrical}
                </Typography>
                <CustomSvgIcon
                  icon="bike"
                  size="30"
                  sx={{ position: 'relative', top: 2, ml: 0.5, opacity: iconOpacity }}
                />
              </Box>
              <Box display="flex" alignItems="center" mr={1}>
                <Typography
                  sx={{
                    opacity:
                      resourceShown === StationResourceTypeEnum.bikes &&
                      bikeTypeFilter !== BikeTypeFilterEnum.electrical
                        ? 1
                        : iconOpacity,
                  }}
                >
                  {totals.mechanical}
                </Typography>
                <CustomSvgIcon
                  icon="gears"
                  size="16"
                  sx={{ position: 'relative', top: 1, ml: 0.5, opacity: iconOpacity }}
                />
              </Box>
              <Box display="flex" alignItems="center" mr={2}>
                <Typography
                  sx={{
                    opacity:
                      resourceShown === StationResourceTypeEnum.bikes &&
                      bikeTypeFilter !== BikeTypeFilterEnum.mechanical
                        ? 1
                        : iconOpacity,
                  }}
                >
                  {totals.electrical}
                </Typography>
                <CustomSvgIcon
                  icon="bolt"
                  size="12"
                  sx={{ position: 'relative', top: 1, ml: 0.2, opacity: iconOpacity }}
                />
              </Box>
              <Box display="flex" alignItems="center">
                <Typography
                  fontSize="1.5em"
                  sx={{
                    opacity: resourceShown === StationResourceTypeEnum.docks ? 1 : iconOpacity,
                  }}
                >
                  {totals.docks}
                </Typography>
                <CustomSvgIcon
                  icon="parking"
                  size="20"
                  sx={{ position: 'relative', top: 1, opacity: iconOpacity }}
                />
              </Box>
            </>
          ) : null}
        </Box>
        <Button
          onClick={_openAppModal}
          variant="text"
          color="primary"
          sx={{ width: '36px', height: '36px', minWidth: '36px' }}
        >
          <CustomSvgIcon icon="settings" />
        </Button>
      </Box>
    </Paper>
  );
};

export default InfoBar;
