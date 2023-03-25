import { rejectGeoLocation, updateGeoLocation } from './map.slice';
import config from '@config';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '@store/store';
import LocalStorage from '@utils/localStorage';
import { dynamicallyLoadScript } from '@utils/scripts';
import { getMapHandlerCenterCoordinates } from 'src/helpers/map.helpers';
import { MapCoordinates } from 'src/types';

const ls = LocalStorage();

export const setCenter = createAsyncThunk<MapCoordinates, MapCoordinates>(
  'map/setCenter',
  async (payload) => {
    ls.setPosition('mapCenter', payload);
    return payload;
  }
);

export const setZoom = createAsyncThunk<number, number>('map/setZoom', async (payload) => {
  ls.setMapZoom(payload);
  return payload;
});

export const loadGMaps = createAsyncThunk<void, HTMLElement>(
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

export const initializeMap = createAsyncThunk<google.maps.Map, HTMLElement>(
  'map/initializeMap',
  async (payload, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const { center: defaultCenter, zoom: defaultZoom, ...restMapOptions } = config.app.mapOptions;

    const mapHandler: google.maps.Map = new window.google.maps.Map(payload, {
      center: state.map.center ?? defaultCenter,
      zoom: state.map.zoom ?? defaultZoom,
      ...restMapOptions,
    });

    mapHandler.addListener('zoom_changed', () => {
      const zoom = mapHandler.getZoom();
      if (zoom) {
        thunkApi.dispatch(setZoom(zoom));
      }
    });

    mapHandler.addListener('center_changed', () => {
      thunkApi.dispatch(setCenter(getMapHandlerCenterCoordinates(mapHandler)));
    });

    window.googleMapsReady = true;

    return mapHandler;
  }
);

export const setGMapsCenter = createAsyncThunk<
  void,
  { center: MapCoordinates; yOffset: -1 | 0 | 1 }
>('map/setGMapsCenter', async (payload, thunkApi) => {
  const baseOffset = window.innerHeight / 4;
  const _yOffset = payload.yOffset * baseOffset;

  (thunkApi.getState() as RootState).map.mapHandler?.setCenter(payload.center);
  (thunkApi.getState() as RootState).map.mapHandler?.panBy(0, _yOffset);
});

export const setGMapsZoom = createAsyncThunk<void, number>(
  'map/setGMapsZoom',
  async (payload, thunkApi) => {
    (thunkApi.getState() as RootState).map.mapHandler?.setZoom(payload);
  }
);

export const geoLocate = createAsyncThunk<void, void>('map/geoLocate', async (_, thunkApi) => {
  navigator.geolocation.getCurrentPosition(
    (currentPosition) => {
      const position = {
        lat: currentPosition.coords.latitude,
        lng: currentPosition.coords.longitude,
      };
      thunkApi.dispatch(
        setGMapsCenter({
          center: position,
          yOffset: 0,
        })
      );
      thunkApi.dispatch(updateGeoLocation({ position, lastUpdated: currentPosition.timestamp }));
    },
    () => {
      thunkApi.dispatch(rejectGeoLocation());
    },
    config.app.geoLocation
  );
});
