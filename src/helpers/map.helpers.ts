import { MapCoordinates } from 'src/types';

export const getMapHandlerCenterCoordinates: (
  mapHandler: google.maps.Map | null
) => MapCoordinates = (mapHandler) => ({
  lat: mapHandler?.getCenter()?.lat() ?? 0,
  lng: mapHandler?.getCenter()?.lng() ?? 0,
});
