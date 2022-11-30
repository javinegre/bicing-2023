import { MapsCoordinates } from 'src/components/InfoBar/InfoBar.helpers';

export interface MapStoreState {
  mapHandler: google.maps.Map | null;
  mapStatus: 'LOADING' | 'IDLE' | 'FAILED';
  center: MapsCoordinates;
  zoom: number;
}
