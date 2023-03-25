import type { AlertColor } from '@mui/material/Alert/Alert';
import type { BikeTypeFilter, SelectedStation, StationResourceTypeEnum } from 'src/types';

export interface UiStoreSnackbar {
  id: string;
  message: string;
  duration?: number | null;
  severity?: AlertColor;
}

export interface UiStoreState {
  selectedStation: SelectedStation | null;
  resourceShown: StationResourceTypeEnum;
  bikeTypeFilter: BikeTypeFilter;
  modalShown: boolean;
  snackbarQueue: UiStoreSnackbar[];
}
