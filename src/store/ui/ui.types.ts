import type { BikeTypeFilter, Station, StationResourceTypeEnum } from 'src/types';

export interface UiStoreState {
  selectedStation: Station | null;
  resourceShown: StationResourceTypeEnum;
  bikeTypeFilter: BikeTypeFilter;
}
