import { useMemo } from 'react';
import type { Station } from './useStation.hook.types';
import {
  StationStatusItem,
  useStationInfoQuery,
  useStationStatusQuery,
} from '@store/api/api.slice';

const useStation = () => {
  const { data: stationsInfo } = useStationInfoQuery('station-info');
  const { data: stationStatuses } = useStationStatusQuery('station-status');

  const list = useMemo(() => {
    let _list = null;

    if (stationsInfo !== undefined && stationStatuses !== undefined) {
      const statuses = stationStatuses.stations.reduce<Record<string, StationStatusItem>>(
        (acc, station) => {
          return { ...acc, [station.id]: station };
        },
        {}
      );

      _list = stationsInfo.stations.reduce<Station[]>((acc, station) => {
        const status: StationStatusItem | undefined = statuses[station.id];

        if (!status) {
          return acc;
        }

        return [
          ...acc,
          {
            ...station,
            ...status,
          },
        ];
      }, []);
    }

    return _list;
  }, [stationsInfo, stationStatuses]);

  return list;
};

export default useStation;
