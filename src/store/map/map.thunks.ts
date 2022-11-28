import { MapHandlerId } from './map.types';
import config from '@config';
import type { Station } from '@hooks/useStation';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '@store/store';
import { dynamicallyLoadScript } from '@utils/scripts';

const initializeMap = createAsyncThunk<
  { mapHandlerId: MapHandlerId; mapHandler: google.maps.Map },
  { mapHandlerId: MapHandlerId; mapRef: HTMLElement }
>('map/initializeMap', async (payload) => {
  const { mapHandlerId, mapRef } = payload;

  const mapHandler: google.maps.Map = new window.google.maps.Map(mapRef, config.app.mapOptions);

  return { mapHandlerId, mapHandler };
});

const loadGMaps = createAsyncThunk<void, { mapHandlerId: MapHandlerId; mapRef: HTMLElement }>(
  'map/loadGMaps',
  async (payload, thunkAPI) => {
    const googleMapsConfig = config.vendor.google.maps;

    if (!window.googleMapsLoaded) {
      window.googleMapsLoaded = true;

      dynamicallyLoadScript(
        `${googleMapsConfig.apiUrl}?key=${googleMapsConfig.apiKey}&callback=initGoogleMapCallback`
      );

      window.initGoogleMapCallback = () => {
        thunkAPI.dispatch(initializeMap(payload));
      };
    } else {
      thunkAPI.dispatch(initializeMap(payload));
    }
  }
);

const selectStation = createAsyncThunk<
  Station['id'],
  { mapHandlerId: MapHandlerId; station: Station }
>('map/selectStation', async (payload, thunkAPI) => {
  const { lat, lng, id } = payload.station;
  const { mapHandlerId } = payload;

  (thunkAPI.getState() as RootState).map.mapHandlers[mapHandlerId]?.setCenter({ lat, lng });

  return id;
});

export { loadGMaps, initializeMap, selectStation };
