import {
  BikeTypeFilter,
  BikeTypeFilterEnum,
  MapCoordinates,
  StationResourceTypeEnum,
} from 'src/types';

export type LocalStoragePositionKeyType =
  | 'mapCenter'
  | 'userLocation'
  | 'bookmarkHome'
  | 'bookmarkWork'
  | 'bookmarkFavorite';

export type LocalStorageNumberKeyType = 'mapZoom' | 'userLocationTimestamp';

export type LocalStorageKeyType =
  | LocalStoragePositionKeyType
  | LocalStorageNumberKeyType
  | 'resourceShown'
  | 'bikeTypeFilter';

const LocalStorage = () => {
  const userLocationKey = 'userLocation';
  const userLocationTimestampKey = 'userLocationTimestamp';
  const userLocationTtl = 7200000; // 2h
  const mapZoomKey = 'mapZoom';
  const resourceShownKey = 'resourceShown';
  const bikeTypeFilterKey = 'bikeTypeFilter';

  const getNumberValue = (key: LocalStorageNumberKeyType): number | null => {
    const numberValue = window.localStorage.getItem(key);
    if (!numberValue) {
      return null;
    }
    try {
      const parsedNumberValue = JSON.parse(numberValue);
      return typeof parsedNumberValue === 'number' ? parsedNumberValue : null;
    } catch {
      return null;
    }
  };

  const setValue = (
    key: LocalStorageKeyType,
    payload: MapCoordinates | BikeTypeFilter | number | null
  ): void => window.localStorage.setItem(key, JSON.stringify(payload));

  const getPosition = (key: LocalStoragePositionKeyType): MapCoordinates | null => {
    const value = window.localStorage.getItem(key);
    if (!value) {
      return null;
    }
    try {
      const parsedValue = JSON.parse(value);
      return typeof parsedValue.lat === 'number' && typeof parsedValue.lng === 'number'
        ? parsedValue
        : null;
    } catch {
      return null;
    }
  };

  const setPosition = (key: LocalStoragePositionKeyType, payload: MapCoordinates | null): void =>
    setValue(key, payload);

  const getUserLocation = (): MapCoordinates | null => {
    const userLocation = getPosition(userLocationKey);
    const timestamp = getNumberValue(userLocationTimestampKey);

    if (userLocation !== null && timestamp !== null) {
      const now = +new Date();
      return now < timestamp + userLocationTtl ? userLocation : null;
    }

    return null;
  };

  const setUserLocation = (payload: MapCoordinates | null): void => {
    const now = +new Date();

    setPosition(userLocationKey, payload);
    setValue(userLocationTimestampKey, now);
  };

  const getMapZoom = (): number | null => getNumberValue(mapZoomKey);

  const setMapZoom: (payload: number | null) => void = (payload) => setValue(mapZoomKey, payload);

  const getResourceShown = (): StationResourceTypeEnum | null => {
    const resourceShown = window.localStorage.getItem(resourceShownKey);
    if (!resourceShown) {
      return null;
    }
    try {
      const parsedResourceShown = JSON.parse(resourceShown);
      return Object.values(StationResourceTypeEnum).includes(parsedResourceShown)
        ? parsedResourceShown
        : null;
    } catch {
      return null;
    }
  };

  const setResourceShown = (payload: StationResourceTypeEnum | null): void => {
    setValue(resourceShownKey, payload);
  };

  const getBikeTypeFilter = (): BikeTypeFilter => {
    const bikeTypeFilter = window.localStorage.getItem(bikeTypeFilterKey);
    if (!bikeTypeFilter) {
      return null;
    }
    try {
      const parsedBikeTypeFilter = JSON.parse(bikeTypeFilter);
      return Object.values(BikeTypeFilterEnum).includes(parsedBikeTypeFilter)
        ? parsedBikeTypeFilter
        : null;
    } catch {
      return null;
    }
  };

  const setBikeTypeFilter = (payload: BikeTypeFilter | null): void => {
    setValue(bikeTypeFilterKey, payload);
  };

  return {
    getPosition,
    setPosition,
    getUserLocation,
    setUserLocation,
    getMapZoom,
    setMapZoom,
    getResourceShown,
    setResourceShown,
    getBikeTypeFilter,
    setBikeTypeFilter,
  };
};

export default LocalStorage;
