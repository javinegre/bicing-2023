import type { Station } from 'src/types';

export interface MarkerWithMetaData extends google.maps.Marker {
  id: Station['id'];
}
