import { getStationDistance, isInNearbyArea } from '@utils/distance';
import { SelectedStation, Station } from 'src/types';

export const getStationList = (
  selectedStation: SelectedStation | null,
  stations: Station[] | null
) => {
  const center = { lat: selectedStation?.lat ?? 0, lng: selectedStation?.lng ?? 0 };

  const unsortedStationList = stations?.reduce<{
    nearby: (Station & { distance: number })[];
    other: (Station & { distance: number })[];
  }>(
    (acc, station) => {
      if (station.id === selectedStation?.id) {
        return acc;
      } else {
        const stationWithDistance = {
          ...station,
          distance: getStationDistance(station, center),
        };

        if (isInNearbyArea(station, center)) {
          return {
            ...acc,
            nearby: [...acc.nearby, stationWithDistance],
          };
        } else {
          return {
            ...acc,
            other: [...acc.other, stationWithDistance],
          };
        }
      }
    },
    { nearby: [], other: [] }
  );

  return {
    nearby: [
      ...(unsortedStationList?.nearby ?? []).sort((a, b) => (a.distance < b.distance ? -1 : 1)),
    ],
    other: [
      ...(unsortedStationList?.other ?? []).sort((a, b) => (a.distance < b.distance ? -1 : 1)),
    ],
  };
};
