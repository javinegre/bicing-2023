import { initializeMap, loadGMaps } from './map.thunks';
import { MapHandlerId, MapStoreState } from './map.types';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: MapStoreState = {
  mapHandlers: {},
  mapStatuses: {},
};

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setZoom: (state, action: PayloadAction<{ mapHandlerId: MapHandlerId; zoom: number }>) => {
      state.mapHandlers[action.payload.mapHandlerId]?.setZoom(action.payload.zoom);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadGMaps.pending, (state, action) => {
      action.meta.arg.mapHandlerId;
      state.mapStatuses[action.meta.arg.mapHandlerId] = 'LOADING';
    });
    builder.addCase(initializeMap.fulfilled, (state, action) => {
      state.mapHandlers[action.payload.mapHandlerId] = action.payload.mapHandler;
      state.mapStatuses[action.payload.mapHandlerId] = 'IDLE';
    });
  },
});

export const { setZoom } = mapSlice.actions;

export default mapSlice.reducer;
