import type { Station } from '@hooks/useStation';

export interface MarkerWithMetaData extends google.maps.Marker {
  id: Station['id'];
}
