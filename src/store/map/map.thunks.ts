import { MapsCoordinates } from './../../components/InfoBar/InfoBar.helpers';
import config from '@config';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setCenter, setZoom } from '@store/map';
import { RootState } from '@store/store';
import { dynamicallyLoadScript } from '@utils/scripts';
import { getMapHandlerCenterCoordinates } from 'src/helpers/map.helpers';

const loadGMaps = createAsyncThunk<void, HTMLElement>(
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

const initializeMap = createAsyncThunk<google.maps.Map, HTMLElement>(
  'map/initializeMap',
  async (payload, thunkApi) => {
    const mapHandler: google.maps.Map = new window.google.maps.Map(payload, config.app.mapOptions);

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

const setGMapsCenter = createAsyncThunk<void, MapsCoordinates>(
  'map/setGMapsCenter',
  async (payload, thunkAPI) => {
    (thunkAPI.getState() as RootState).map.mapHandler?.setCenter(payload);
  }
);

const setGMapsZoom = createAsyncThunk<void, number>(
  'map/setGMapsZoom',
  async (payload, thunkAPI) => {
    (thunkAPI.getState() as RootState).map.mapHandler?.setZoom(payload);
  }
);

export { loadGMaps, initializeMap, setGMapsCenter, setGMapsZoom };
