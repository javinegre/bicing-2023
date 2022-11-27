import React, { FC, useEffect, useRef } from 'react';
import config from '@config';
import Box from '@mui/material/Box/Box';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { loadGMaps, mapHandlerSelector, setZoom } from '@store/map';

const Map: FC = () => {
  const { mapId } = config.app;

  const mapHandler = useAppSelector(mapHandlerSelector(mapId));
  const dispatch = useAppDispatch();

  const mapRef = useRef<HTMLDivElement>();

  useEffect(() => {
    console.log(mapRef.current);
    if (mapRef.current !== undefined) {
      dispatch(loadGMaps({ mapHandlerId: mapId, mapRef: mapRef.current }));
    }
  }, [mapRef]);

  return (
    <Box>
      Map
      <button
        onClick={() => {
          dispatch(setZoom({ mapHandlerId: mapId, zoom: 3 }));
        }}
      >
        zoom
      </button>
      <button
        onClick={() => {
          console.log(mapHandler?.getZoom());
          console.log(mapHandler?.getCenter()?.toJSON());
        }}
      >
        zoom cl
      </button>
      <Box sx={{ width: 600, height: 600 }} ref={mapRef}></Box>
    </Box>
  );
};

export default Map;
