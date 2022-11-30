import React, { FC, useEffect, useLayoutEffect, useRef } from 'react';
import { MarkerWithMetaData } from './MapCanvas.types';
import useStation from '@hooks/useStation';
import Box from '@mui/material/Box/Box';
import { SxProps, Theme } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { loadGMaps, mapHandlerSelector } from '@store/map';
import { selectStation } from '@store/ui';

const sx: SxProps<Theme> = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 1,
};

const MapCanvas: FC = () => {
  const mapHandler = useAppSelector(mapHandlerSelector);
  const dispatch = useAppDispatch();

  const mapRef = useRef<HTMLDivElement>();

  const stations = useStation();

  useEffect(() => {
    if (mapRef.current !== undefined) {
      dispatch(loadGMaps(mapRef.current));
    }
  }, [mapRef]);

  useLayoutEffect(() => {
    stations?.forEach((station) => {
      if (window.googleMapsReady) {
        const newMarker = new google.maps.Marker({
          map: mapHandler as google.maps.Map,
          position: { lat: station.lat, lng: station.lng },
        });

        newMarker.setValues({
          id: station.id,
        });

        const clickEvent = () => {
          dispatch(selectStation(station));
        };

        if (clickEvent) {
          newMarker.addListener('click', clickEvent);
        }

        return newMarker as MarkerWithMetaData;
      }
    });
  }, [mapHandler, stations]);

  return <Box sx={sx} ref={mapRef}></Box>;
};

export default MapCanvas;
