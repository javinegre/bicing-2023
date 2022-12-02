import { selectStation, unselectStation } from './ui.thunks';
import { UiStoreState } from './ui.types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: UiStoreState = {
  selectedStation: null,
};

export const mapSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(selectStation.fulfilled, (state, action) => {
      state.selectedStation = action.payload;
    });
    builder.addCase(unselectStation.fulfilled, (state) => {
      state.selectedStation = null;
    });
  },
});

// export const { } = mapSlice.actions;

export default mapSlice.reducer;
