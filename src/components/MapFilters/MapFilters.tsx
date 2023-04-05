import React from 'react';
import CustomSvgIcon from '@components/Icons/CustomSvgIcon';
import Box from '@mui/material/Box/Box';
import Button from '@mui/material/Button/Button';
import { SxProps, Theme } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import {
  bikeTypeFilterSelector,
  resourceShownSelector,
  toggleFilter,
  toggleResourceShown,
} from '@store/ui';
import { BikeTypeFilterEnum, StationResourceTypeEnum } from 'src/types';

const sxCircleButton: SxProps<Theme> = {
  width: '36px',
  height: '36px',
  minWidth: '36px',
  borderRadius: '50%',
};

const MapFilters = () => {
  const bikeTypeFilter = useAppSelector(bikeTypeFilterSelector);
  const resourceShown = useAppSelector(resourceShownSelector);

  const dispatch = useAppDispatch();

  const isBikesActive = resourceShown === StationResourceTypeEnum.bikes;
  const isMechanicalActive =
    bikeTypeFilter === null || bikeTypeFilter === BikeTypeFilterEnum.mechanical;
  const isElectricalActive =
    bikeTypeFilter === null || bikeTypeFilter === BikeTypeFilterEnum.electrical;

  return (
    <Box display="flex" alignItems="center">
      <Button
        variant="contained"
        color="primary"
        disabled={!isBikesActive}
        sx={{
          ...sxCircleButton,
          mr: 0.5,
          opacity: isMechanicalActive ? 1 : 0.5,
        }}
        onClick={() => {
          dispatch(toggleFilter(BikeTypeFilterEnum.mechanical));
        }}
      >
        <CustomSvgIcon icon="gears" size="22" sx={{ opacity: isBikesActive ? 1 : 0.5 }} />
      </Button>
      <Button
        variant="contained"
        color="primary"
        disabled={!isBikesActive}
        sx={{
          ...sxCircleButton,
          mr: 0.5,
          opacity: isElectricalActive ? 1 : 0.5,
        }}
        onClick={() => {
          dispatch(toggleFilter(BikeTypeFilterEnum.electrical));
        }}
      >
        <CustomSvgIcon icon="bolt" size="16" sx={{ opacity: isBikesActive ? 1 : 0.5 }} />
      </Button>
      <Box
        position="relative"
        sx={{
          width: 90,
          height: 48,
          borderRadius: 24,
          backgroundColor: '#000000A0',
          cursor: 'pointer',
        }}
        onClick={() => {
          dispatch(toggleResourceShown());
        }}
      >
        <Button
          variant="contained"
          color="primary"
          sx={{
            width: '48px',
            height: '48px',
            minWidth: '48px',
            borderRadius: '50%',
            position: 'relative',
            transform: `translateX(${isBikesActive ? 0 : 42}px)`,
            transition: 'transform ease 200ms',
          }}
        />
        <Box
          position="absolute"
          display="flex"
          sx={{
            top: 0,
            left: 0,
            width: 48,
            height: 48,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CustomSvgIcon icon="bike" size="28" />
        </Box>
        <Box
          position="absolute"
          display="flex"
          sx={{
            top: 0,
            right: 0,
            width: 48,
            height: 48,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CustomSvgIcon icon="parking" size="18" />
        </Box>
      </Box>
    </Box>
  );
};

export default MapFilters;
