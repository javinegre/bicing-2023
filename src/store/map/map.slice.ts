import { initializeMap, loadGMaps, setCenter, setZoom } from './map.thunks';
import { MapStoreState } from './map.types';
import config from '@config';
import { createSlice } from '@reduxjs/toolkit';
import LocalStorage from '@utils/localStorage';

const ls = LocalStorage();

const initialState: MapStoreState = {
  mapHandler: null,
  mapStatus: 'IDLE',
  center: ls.getPosition('mapCenter') ?? config.app.mapOptions.center,
  zoom: ls.getMapZoom() ?? config.app.mapOptions.zoom,
};

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {},
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
  },
});

// export const {  } = mapSlice.actions;

export default mapSlice.reducer;
