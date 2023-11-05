import React, { FC, useEffect, useLayoutEffect, useRef } from 'react';
import { MarkerWithMetaData } from './MapCanvas.types';
import FavoriteMarkerIcon from '@assets/icons/markers/bookmark-favorite.svg?url';
import HomeMarkerIcon from '@assets/icons/markers/bookmark-home.svg?url';
import WorkMarkerIcon from '@assets/icons/markers/bookmark-work.svg?url';
import UserLocationIcon from '@assets/icons/ui/user-location.svg?url';
import { getStationMarkerIcon } from '@components/Icons/Icons.helpers';
import useStation from '@hooks/useStation';
import Box from '@mui/material/Box/Box';
import { SxProps, Theme } from '@mui/material/styles';
import { type BookmarkType, bookmarksSelector } from '@store/bookmarks';
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
  const bookmarks = useAppSelector(bookmarksSelector);
  const dispatch = useAppDispatch();

  const mapRef = useRef<HTMLDivElement>();

  const stationMarkers = useRef<Record<Station['id'], MarkerWithMetaData>>({});
  const bookmarkMarkers = useRef<Record<BookmarkType, google.maps.Marker | null>>({
    home: null,
    work: null,
    favorite: null,
  });
  const userLocationMarker = useRef<google.maps.Marker | null>();

  const stations = useStation();

  const getBookmarkMarker = (bookmarkType: BookmarkType) => {
    switch (bookmarkType) {
      case 'home':
        return HomeMarkerIcon;
      case 'work':
        return WorkMarkerIcon;
      case 'favorite':
        return FavoriteMarkerIcon;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (mapRef.current !== undefined) {
      dispatch(loadGMaps(mapRef.current));
    }
  }, [mapRef]);

  useLayoutEffect(() => {
    if (!window.googleMapsReady) {
      return;
    }

    const bookmarkTypes: BookmarkType[] = ['home', 'work', 'favorite'];

    bookmarkTypes.forEach((bookmarkType) => {
      const bookmarkLocation = bookmarks[bookmarkType];
      let bookmarkMarker = bookmarkMarkers.current[bookmarkType];

      if (bookmarkLocation) {
        if (bookmarkMarker) {
          bookmarkMarker.setPosition(bookmarkLocation);
        } else {
          bookmarkMarkers.current[bookmarkType] = new google.maps.Marker({
            map: mapHandler as google.maps.Map,
            position: bookmarkLocation,
            icon: getBookmarkMarker(bookmarkType),
          });
        }
      } else {
        if (bookmarkMarker) {
          bookmarkMarker.setMap(null);
          bookmarkMarker = null;
        }
      }
    });

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
    bookmarks,
    userLocation,
    zoom,
    stationMarkers.current,
    resourceShown,
    bikeTypeFilter,
  ]);

  return <Box sx={sx} ref={mapRef}></Box>;
};

export default MapCanvas;
