import React, { FC, useEffect, useLayoutEffect, useRef } from 'react';
import { MarkerWithMetaData } from './Map.types';
import config from '@config';
import useStation from '@hooks/useStation';
import Box from '@mui/material/Box/Box';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { loadGMaps, mapHandlerSelector, selectStation, selectedStationSelector } from '@store/map';

const Map: FC = () => {
  const { mapId } = config.app;

  const mapHandler = useAppSelector(mapHandlerSelector(mapId));
  const selectedStation = useAppSelector(selectedStationSelector);
  const dispatch = useAppDispatch();

  const mapRef = useRef<HTMLDivElement>();

  const stations = useStation();

  useEffect(() => {
    console.log(mapRef.current);
    if (mapRef.current !== undefined) {
      dispatch(loadGMaps({ mapHandlerId: mapId, mapRef: mapRef.current }));
    }
  }, [mapRef]);

  useLayoutEffect(() => {
    stations?.forEach((station) => {
      const newMarker = new google.maps.Marker({
        map: mapHandler as google.maps.Map,
        position: { lat: station.lat, lng: station.lng },
      });

      newMarker.setValues({
        id: station.id,
      });

      const clickEvent = () => {
        dispatch(selectStation({ mapHandlerId: mapId, station }));
      };

      if (clickEvent) {
        newMarker.addListener('click', clickEvent);
      }

      return newMarker as MarkerWithMetaData;
    });
  }, [mapHandler, stations]);

  return (
    <Box>
      Map
      {selectedStation}
      <Box sx={{ width: 600, height: 600 }} ref={mapRef}></Box>
    </Box>
  );
};

export default Map;
