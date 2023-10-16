import React, { FC } from 'react';
import CustomSvgIcon from '@components/Icons/CustomSvgIcon';
import { useTheme } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { geoLocate, userLocationStatusSelector } from '@store/map';
import CircleButton from 'src/reusable/CircleButton/CircleButton';

const MapGeoLocation: FC = () => {
  const dispatch = useAppDispatch();
  const userLocationStatus = useAppSelector(userLocationStatusSelector);
  const theme = useTheme();

  const isLoading = userLocationStatus === 'LOADING';

  return (
    <CircleButton
      size={40}
      mb={1}
      disabled={isLoading}
      onClick={() => {
        dispatch(geoLocate());
      }}
    >
      <CustomSvgIcon icon="user-location" pathFill={theme.palette.text.primary} size="20" />
    </CircleButton>
  );
};

export default MapGeoLocation;
