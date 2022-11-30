import { createDraftSafeSelector } from '@reduxjs/toolkit';
import { RootState } from '@store/store';

const uiSelector = (state: RootState) => state.ui;

export const selectedStationSelector = createDraftSafeSelector(
  uiSelector,
  (uiState) => uiState.selectedStation
);
