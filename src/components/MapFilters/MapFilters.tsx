import React from 'react';
import Button from '@mui/material/Button/Button';
import { SxProps, Theme } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import {
  bikeTypeFilterSelector,
  resourceShownSelector,
  toggleFilter,
  toggleResourceShown,
} from '@store/ui';
import { StationResourceTypeEnum } from 'src/types';

const sxCircleButton: SxProps<Theme> = {
  width: '48px',
  height: '48px',
  padding: 0,
  margin: 0,
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
          opacity: bikeTypeFilter === null || bikeTypeFilter === 'electrical' ? 1 : 0.5,
        }}
        onClick={() => {
          dispatch(toggleFilter('electrical'));
        }}
      >
        e
      </Button>
      <Button
        variant="contained"
        color="primary"
        disabled={resourceShown !== StationResourceTypeEnum.bikes}
        sx={{
          ...sxCircleButton,
          opacity: bikeTypeFilter === null || bikeTypeFilter === 'mechanical' ? 1 : 0.5,
        }}
        onClick={() => {
          dispatch(toggleFilter('mechanical'));
        }}
      >
        m
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          dispatch(toggleResourceShown());
        }}
      >
        {resourceShown === StationResourceTypeEnum.bikes ? 'Bikes' : 'Docks'}
      </Button>
    </>
  );
};

export default MapFilters;
