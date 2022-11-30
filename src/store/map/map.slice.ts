import { initializeMap, loadGMaps } from './map.thunks';
import { MapStoreState } from './map.types';
import config from '@config';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { MapsCoordinates } from 'src/components/InfoBar/InfoBar.helpers';

const initialState: MapStoreState = {
  mapHandler: null,
  mapStatus: 'IDLE',
  center: config.app.mapOptions.center,
  zoom: config.app.mapOptions.zoom,
};

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setCenter: (state, action: PayloadAction<MapsCoordinates>) => {
      state.center = action.payload;
    },
    setZoom: (state, action: PayloadAction<number>) => {
      state.zoom = action.payload;
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
  },
});

export const { setCenter, setZoom } = mapSlice.actions;

export default mapSlice.reducer;
