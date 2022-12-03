import { ApiStationStatus } from '@store/api/api.types';
import { isInNearbyArea } from '@utils/distance';
import { MapCoordinates, Station } from 'src/types';

export const getResourceTotals = (stations: Station[] | null, center: MapCoordinates) => {
  const activeNearByStations = stations?.filter(
    (station) => isInNearbyArea(station, center) && station.status === ApiStationStatus.active
  );

  return activeNearByStations?.reduce(
    (acc, station) => {
      return {
        docks: acc.docks + station.docks,
        mechanical: acc.mechanical + station.mechanical,
        electrical: acc.electrical + station.electrical,
      };
    },
    { docks: 0, mechanical: 0, electrical: 0 }
  );
};
