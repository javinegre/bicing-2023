import type { BikeTypeFilter, SelectedStation, StationResourceTypeEnum } from 'src/types';

export interface UiStoreState {
  selectedStation: SelectedStation | null;
  resourceShown: StationResourceTypeEnum;
  bikeTypeFilter: BikeTypeFilter;
}
