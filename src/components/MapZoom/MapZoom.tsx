import React, { useCallback } from 'react';
import config from '@config';
import Slider from '@mui/material/Slider/Slider';
import { SxProps, Theme } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { mapZoomSelector, setGMapsZoom, setZoom } from '@store/map';

const sx: SxProps<Theme> = {
  position: 'absolute',
  bottom: 20,
  right: 20,
  width: 200,
  pointerEvents: 'auto',
};

const MapZoom = () => {
  const defaultZoom = config.app.mapOptions.zoom;

  const mapZoom = useAppSelector(mapZoomSelector);

  const dispatch = useAppDispatch();

  const _onChange = useCallback(
    (_: Event, newValue: number | number[]) => {
      const zoom = typeof newValue === 'number' ? newValue : newValue?.[0] ?? defaultZoom;
      dispatch(setGMapsZoom(zoom));
    },
    [dispatch, setZoom, defaultZoom]
  );

  return <Slider sx={sx} min={12} max={17} value={mapZoom} onChange={_onChange} />;
};

export default MapZoom;
