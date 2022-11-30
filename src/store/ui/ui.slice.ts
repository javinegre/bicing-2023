import { selectStation } from './ui.thunks';
import { UiStoreState } from './ui.types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: UiStoreState = {
  selectedStation: null,
};

export const mapSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    unselectStation: (state) => {
      state.selectedStation = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(selectStation.fulfilled, (state, action) => {
      state.selectedStation = action.payload;
    });
  },
});

export const { unselectStation } = mapSlice.actions;

export default mapSlice.reducer;
