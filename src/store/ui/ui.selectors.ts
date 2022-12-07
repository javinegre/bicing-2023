import { createDraftSafeSelector } from '@reduxjs/toolkit';
import { RootState } from '@store/store';

const uiSelector = (state: RootState) => state.ui;

export const viewModeSelector = createDraftSafeSelector(uiSelector, (uiState) =>
  uiState.selectedStation === null ? 'default' : 'detail'
);
export const resourceShownSelector = createDraftSafeSelector(
  uiSelector,
  (uiState) => uiState.resourceShown
);
export const bikeTypeFilterSelector = createDraftSafeSelector(
  uiSelector,
  (uiState) => uiState.bikeTypeFilter
);
export const selectedStationSelector = createDraftSafeSelector(
  uiSelector,
  (uiState) => uiState.selectedStation
);
