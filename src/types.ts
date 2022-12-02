import type { ApiStationInfoItemResponse, ApiStationInfoResponse } from '@store/api/api.types';

export interface MapCoordinates {
  lat: number;
  lng: number;
}

export type StationInfoItem = ApiStationInfoItemResponse;
export type StationInfo = ApiStationInfoResponse;

export interface StationStatusItem {
  id: number;
  electrical: number;
  mechanical: number;
  docks: number;
  status: number;
}

export interface StationStatus {
  lastUpdated: number;
  stations: StationStatusItem[];
  success: boolean;
}

export type Station = StationInfoItem & StationStatusItem;

export enum StationResourceTypeEnum {
  bikes,
  docks,
}

export enum BikeTypeEnum {
  mechanical,
  electrical,
}

export type BikeTypeFilter = 'mechanical' | 'electrical' | null;

export type MarkerColorType = 'black' | 'red' | 'orange' | 'green' | 'gray';

export interface MarkerStateColor {
  threshold: number;
  color: MarkerColorType;
}

export interface MarkerColorConfig {
  inactive: MarkerStateColor;
  none: MarkerStateColor;
  danger: MarkerStateColor;
  warning: MarkerStateColor;
  success: MarkerStateColor;
}
