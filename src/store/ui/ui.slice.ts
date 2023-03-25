import { selectStation, unselectStation } from './ui.thunks';
import { UiStoreSnackbar, UiStoreState } from './ui.types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { StationResourceTypeEnum } from 'src/types';
import type { BikeTypeFilter } from 'src/types';

const initialState: UiStoreState = {
  appError: null,
  selectedStation: null,
  resourceShown: StationResourceTypeEnum.bikes,
  bikeTypeFilter: null,
  modalShown: false,
  snackbarQueue: [],
};

export const mapSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setAppError: (state, action: PayloadAction<{ errorMessage: string | undefined }>) => {
      state.appError = action.payload;
    },
    unsetAppError: (state) => {
      state.appError = null;
    },
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
    openModal: (state) => {
      state.modalShown = true;
    },
    closeModal: (state) => {
      state.modalShown = false;
    },
    enqueueSnackbar: (state, action: PayloadAction<Omit<UiStoreSnackbar, 'id'>>) => {
      state.snackbarQueue = [
        ...state.snackbarQueue,
        { id: String(+new Date()), ...action.payload },
      ];
    },
    processSnackbarQueue: (state) => {
      state.snackbarQueue = state.snackbarQueue.filter((_, idx) => idx !== 0);
    },
    clearSnackbarQueue: (state) => {
      state.snackbarQueue = [];
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

export const {
  setAppError,
  unsetAppError,
  toggleResourceShown,
  toggleFilter,
  enqueueSnackbar,
  openModal,
  closeModal,
  processSnackbarQueue,
} = mapSlice.actions;

export default mapSlice.reducer;
