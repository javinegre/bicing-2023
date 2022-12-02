import icons from './ResourceIcons';
import config from '@config';
import { ApiStationStatus } from '@store/api/api.types';
import { StationResourceTypeEnum } from 'src/types';
import type { BikeTypeFilter, MarkerColorType, Station } from 'src/types';

const getStationResourceNumber = (
  station: Station,
  resourceShown: StationResourceTypeEnum,
  bikeTypeFilter: BikeTypeFilter
) => {
  let resourceNumber;

  if (resourceShown === StationResourceTypeEnum.bikes) {
    if (bikeTypeFilter === 'mechanical') {
      resourceNumber = station.mechanical;
    } else if (bikeTypeFilter === 'electrical') {
      resourceNumber = station.electrical;
    } else {
      resourceNumber = station.mechanical + station.electrical;
    }
  } else {
    resourceNumber = station.docks;
  }

  return resourceNumber;
};

const getStationMarkerSize = (mapZoom: number) =>
  mapZoom >= config.app.mapMarkerSizeZoomThreshold ? 'big' : 'small';

const getStationMarkerColor = (station: Station, resourceNumber: number) => {
  let color: MarkerColorType;
  const colorConfig = config.app.markerColor;

  if (station.status === ApiStationStatus.active) {
    if (resourceNumber === colorConfig.none.threshold) {
      color = colorConfig.none.color;
    } else if (resourceNumber <= colorConfig.danger.threshold) {
      color = colorConfig.danger.color;
    } else if (resourceNumber <= colorConfig.warning.threshold) {
      color = colorConfig.warning.color;
    } else {
      color = colorConfig.success.color;
    }
  } else {
    color = colorConfig.inactive.color;
  }

  return color;
};

export const getStationMarkerIcon = (
  station: Station,
  resourceShown: StationResourceTypeEnum,
  bikeTypeFilter: BikeTypeFilter,
  mapZoom: number
) => {
  const resourceNumber = getStationResourceNumber(station, resourceShown, bikeTypeFilter);
  const size = getStationMarkerSize(mapZoom);
  const color = getStationMarkerColor(station, resourceNumber);

  return icons[resourceShown][size][color];
};
