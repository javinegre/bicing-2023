import { geoLocate, initializeMap, loadGMaps, setCenter, setZoom } from './map.thunks';
import { MapStoreState } from './map.types';
import config from '@config';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import LocalStorage from '@utils/localStorage';
import { MapCoordinates } from 'src/types';

const ls = LocalStorage();

const initialState: MapStoreState = {
  mapHandler: null,
  mapStatus: 'IDLE',
  center: ls.getPosition('mapCenter') ?? config.app.mapOptions.center,
  zoom: ls.getMapZoom() ?? config.app.mapOptions.zoom,
  geoLocation: {
    position: null,
    lastUpdated: null,
    status: 'IDLE',
  },
};

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    updateGeoLocation: (
      state,
      action: PayloadAction<{ position: MapCoordinates; lastUpdated: number }>
    ) => {
      state.geoLocation.status = 'IDLE';
      state.geoLocation.position = action.payload.position;
      state.geoLocation.lastUpdated = action.payload.lastUpdated;
    },
    rejectGeoLocation: (state) => {
      console.log('rejectGeoLocation');
      state.geoLocation.status = 'FAILED';
      state.geoLocation.position = null;
      state.geoLocation.lastUpdated = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadGMaps.pending, (state) => {
      state.mapStatus = 'LOADING';
    });
    builder.addCase(initializeMap.fulfilled, (state, action) => {
      state.mapHandler = action.payload;
      state.mapStatus = 'IDLE';
    });
    builder.addCase(setCenter.fulfilled, (state, action) => {
      state.center = action.payload;
    });
    builder.addCase(setZoom.fulfilled, (state, action) => {
      state.zoom = action.payload;
    });
    builder.addCase(geoLocate.pending, (state) => {
      state.geoLocation.status = 'LOADING';
    });
  },
});

export const { updateGeoLocation, rejectGeoLocation } = mapSlice.actions;

export default mapSlice.reducer;
