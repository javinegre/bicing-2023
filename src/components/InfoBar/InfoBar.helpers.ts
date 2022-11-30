import config from '@config';
import { Station } from '@hooks/useStation';

export interface MapsCoordinates {
  lat: number;
  lng: number;
}

export const isInNearbyArea: (point: Station, center: MapsCoordinates) => boolean = (
  point,
  center
) => {
  // From: https://math.stackexchange.com/questions/76457/check-if-a-point-is-within-an-ellipse
  //   (pointLat - centerLat)²    (pointLng - centerLng)²
  //  ------------------------ + ------------------------ ≤ 1
  //         radiusLat²                 radiusLng²

  const { lat: radiusLat, lng: radiusLng } = config.app.nearbyAreaRadius;

  return (
    (point.lat - center.lat) ** 2 / radiusLat ** 2 +
      (point.lng - center.lng) ** 2 / radiusLng ** 2 <=
    1
  );
};
