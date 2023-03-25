import { MapCoordinates } from 'src/types';

export interface MapStoreState {
  mapHandler: google.maps.Map | null;
  mapStatus: 'LOADING' | 'IDLE' | 'FAILED';
  center: MapCoordinates;
  zoom: number;
  geoLocation: {
    position: MapCoordinates | null;
    lastUpdated: number | null;
    status: 'LOADING' | 'IDLE' | 'FAILED';
  };
}
