import React, { FC, useEffect, useLayoutEffect, useRef } from 'react';
import { MarkerWithMetaData } from './MapCanvas.types';
import UserLocationIcon from '@assets/icons/ui/user-location.svg?url';
import { getStationMarkerIcon } from '@components/Icons/Icons.helpers';
import useStation from '@hooks/useStation';
import Box from '@mui/material/Box/Box';
import { SxProps, Theme } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { loadGMaps, mapHandlerSelector, mapZoomSelector, userLocationSelector } from '@store/map';
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
  const userLocation = useAppSelector(userLocationSelector);
  const dispatch = useAppDispatch();

  const mapRef = useRef<HTMLDivElement>();

  const stationMarkers = useRef<Record<Station['id'], MarkerWithMetaData>>({});
  const userLocationMarker = useRef<google.maps.Marker | null>();

  const stations = useStation();

  useEffect(() => {
    if (mapRef.current !== undefined) {
      dispatch(loadGMaps(mapRef.current));
    }
  }, [mapRef]);

  useLayoutEffect(() => {
    if (!window.googleMapsReady) {
      return;
    }

    stations?.forEach((station) => {
      const marker = stationMarkers.current[station.id];

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
          dispatch(selectStation({ id: station.id, lat: station.lat, lng: station.lng }));
        });

        stationMarkers.current[station.id] = newMarker as MarkerWithMetaData;
      }
    });

    if (userLocation) {
      if (userLocationMarker.current) {
        userLocationMarker.current.setPosition(userLocation);
      } else {
        userLocationMarker.current = new google.maps.Marker({
          map: mapHandler as google.maps.Map,
          position: userLocation,
          icon: UserLocationIcon,
        });
      }
    } else {
      if (userLocationMarker.current) {
        userLocationMarker.current.setMap(null);
        userLocationMarker.current = null;
      }
    }
  }, [
    mapHandler,
    stations,
    userLocation,
    zoom,
    stationMarkers.current,
    resourceShown,
    bikeTypeFilter,
  ]);

  return <Box sx={sx} ref={mapRef}></Box>;
};

export default MapCanvas;
