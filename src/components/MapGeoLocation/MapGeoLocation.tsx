import React, { FC } from 'react';
import Button from '@mui/material/Button/Button';
import { SxProps, Theme } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { geoLocate, userLocationStatusSelector } from '@store/map';

const sxCircleButton: SxProps<Theme> = {
  width: '40px',
  height: '40px',
  minWidth: '32px',
  borderRadius: '50%',
  pointerEvents: 'auto',
};

const MapGeoLocation: FC = () => {
  const dispatch = useAppDispatch();
  const userLocationStatus = useAppSelector(userLocationStatusSelector);

  const isLoading = userLocationStatus === 'LOADING';

  return (
    <Button
      variant="contained"
      color="primary"
      disabled={isLoading}
      sx={{
        ...sxCircleButton,
        mb: 1,
      }}
      onClick={() => {
        dispatch(geoLocate());
      }}
    >
      G
    </Button>
  );
};

export default MapGeoLocation;
