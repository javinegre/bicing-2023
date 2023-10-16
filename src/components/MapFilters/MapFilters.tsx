import React from 'react';
import CustomSvgIcon from '@components/Icons/CustomSvgIcon';
import ResourceSwitch from '@components/ResourceSwitch/ResourceSwitch';
import Box from '@mui/material/Box/Box';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { bikeTypeFilterSelector, resourceShownSelector, toggleFilter } from '@store/ui';
import CircleButton from 'src/reusable/CircleButton/CircleButton';
import { BikeTypeFilterEnum, StationResourceTypeEnum } from 'src/types';

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
      <CircleButton
        size={36}
        mr={0.5}
        opacity={isMechanicalActive ? 1 : 0.5}
        onClick={() => {
          dispatch(toggleFilter(BikeTypeFilterEnum.mechanical));
        }}
      >
        <CustomSvgIcon icon="gears" size="22" sx={{ opacity: isBikesActive ? 1 : 0.5 }} />
      </CircleButton>

      <CircleButton
        size={36}
        mr={0.5}
        opacity={isElectricalActive ? 1 : 0.5}
        onClick={() => {
          dispatch(toggleFilter(BikeTypeFilterEnum.electrical));
        }}
      >
        <CustomSvgIcon icon="bolt" size="16" sx={{ opacity: isBikesActive ? 1 : 0.5 }} />
      </CircleButton>

      <ResourceSwitch />
    </Box>
  );
};

export default MapFilters;
