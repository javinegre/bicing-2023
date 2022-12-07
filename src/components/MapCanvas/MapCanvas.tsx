import React, { FC, useEffect, useLayoutEffect, useRef } from 'react';
import { MarkerWithMetaData } from './MapCanvas.types';
import { getStationMarkerIcon } from '@components/Icons/Icons.helpers';
import useStation from '@hooks/useStation';
import Box from '@mui/material/Box/Box';
import { SxProps, Theme } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { loadGMaps, mapHandlerSelector, mapZoomSelector } from '@store/map';
import { bikeTypeFilterSelector, resourceShownSelector, selectStation } from '@store/ui';
import type { Station } from 'src/types';

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
  const zoom = useAppSelector(mapZoomSelector);
  const bikeTypeFilter = useAppSelector(bikeTypeFilterSelector);
  const resourceShown = useAppSelector(resourceShownSelector);
  const dispatch = useAppDispatch();
  const markers = useRef<Record<Station['id'], MarkerWithMetaData | undefined>>({});

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
        const marker = markers.current[station.id];

        const markerIcon = getStationMarkerIcon(station, resourceShown, bikeTypeFilter, zoom);

        if (marker) {
          marker.setIcon(markerIcon);
        } else {
          const newMarker = new google.maps.Marker({
            map: mapHandler as google.maps.Map,
            position: { lat: station.lat, lng: station.lng },
            icon: markerIcon,
          });

          newMarker.setValues({
            id: station.id,
          });

          newMarker.addListener('click', () => {
            dispatch(selectStation(station));
          });

          markers.current[station.id] = newMarker as MarkerWithMetaData;
        }
      }
    });
  }, [mapHandler, stations, zoom, markers.current, resourceShown, bikeTypeFilter]);

  return <Box sx={sx} ref={mapRef}></Box>;
};

export default MapCanvas;
