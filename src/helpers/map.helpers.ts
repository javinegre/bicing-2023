import { MapsCoordinates } from 'src/components/InfoBar/InfoBar.helpers';

export const getMapHandlerCenterCoordinates: (
  mapHandler: google.maps.Map | null
) => MapsCoordinates = (mapHandler) => ({
  lat: mapHandler?.getCenter()?.lat() ?? 0,
  lng: mapHandler?.getCenter()?.lng() ?? 0,
});
