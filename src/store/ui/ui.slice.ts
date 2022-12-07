import { selectStation, unselectStation } from './ui.thunks';
import { UiStoreState } from './ui.types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { StationResourceTypeEnum } from 'src/types';
import type { BikeTypeFilter } from 'src/types';

const initialState: UiStoreState = {
  selectedStation: null,
  resourceShown: StationResourceTypeEnum.bikes,
  bikeTypeFilter: null,
};

export const mapSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleResourceShown: (state) => {
      state.resourceShown =
        state.resourceShown === StationResourceTypeEnum.bikes
          ? StationResourceTypeEnum.docks
          : StationResourceTypeEnum.bikes;
    },
    toggleFilter: (state, action: PayloadAction<NonNullable<BikeTypeFilter>>) => {
      const newFilter: BikeTypeFilter =
        state.bikeTypeFilter === null || state.bikeTypeFilter === action.payload
          ? action.payload
          : null;

      state.bikeTypeFilter = newFilter;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(selectStation.fulfilled, (state, action) => {
      state.selectedStation = action.payload;
    });
    builder.addCase(unselectStation.fulfilled, (state) => {
      state.selectedStation = null;
    });
  },
});

export const { toggleResourceShown, toggleFilter } = mapSlice.actions;

export default mapSlice.reducer;
