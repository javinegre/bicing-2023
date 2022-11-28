import type { Station } from '@hooks/useStation';

export type MapHandlerId = string;

export interface MapStoreState {
  mapHandlers: Record<MapHandlerId, google.maps.Map | null>;
  mapStatuses: Record<MapHandlerId, 'LOADING' | 'IDLE' | 'FAILED'>;
  selectedStation: Station['id'] | null;
}
