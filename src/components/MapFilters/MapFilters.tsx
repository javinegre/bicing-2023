import React from 'react';
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
  width: '48px',
  height: '48px',
  minWidth: '48px',
  borderRadius: '50%',
};

const MapFilters = () => {
  const bikeTypeFilter = useAppSelector(bikeTypeFilterSelector);
  const resourceShown = useAppSelector(resourceShownSelector);

  const dispatch = useAppDispatch();

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        disabled={resourceShown !== StationResourceTypeEnum.bikes}
        sx={{
          ...sxCircleButton,
          mr: 0.5,
          opacity:
            bikeTypeFilter === null || bikeTypeFilter === BikeTypeFilterEnum.mechanical ? 1 : 0.5,
        }}
        onClick={() => {
          dispatch(toggleFilter(BikeTypeFilterEnum.mechanical));
        }}
      >
        m
      </Button>
      <Button
        variant="contained"
        color="primary"
        disabled={resourceShown !== StationResourceTypeEnum.bikes}
        sx={{
          ...sxCircleButton,
          mr: 0.5,
          opacity:
            bikeTypeFilter === null || bikeTypeFilter === BikeTypeFilterEnum.electrical ? 1 : 0.5,
        }}
        onClick={() => {
          dispatch(toggleFilter(BikeTypeFilterEnum.electrical));
        }}
      >
        e
      </Button>
      <Box
        position="relative"
        sx={{
          width: 84,
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
            ...sxCircleButton,
            position: 'relative',
            transform: `translateX(${resourceShown === StationResourceTypeEnum.bikes ? 0 : 36}px)`,
            transition: 'transform ease 200ms',
          }}
        >
          {/* {resourceShown === StationResourceTypeEnum.bikes ? 'B' : 'D'} */}
        </Button>
        <Box
          position="absolute"
          sx={{ top: 0, left: 0, width: 48, lineHeight: '48px', textAlign: 'center' }}
        >
          B
        </Box>
        <Box
          position="absolute"
          sx={{ top: 0, right: 0, width: 48, lineHeight: '48px', textAlign: 'center' }}
        >
          D
        </Box>
      </Box>
    </>
  );
};

export default MapFilters;
