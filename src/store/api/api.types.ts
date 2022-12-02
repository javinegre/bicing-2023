export interface ApiStationInfoItemResponse {
  id: number;
  lat: number;
  lng: number;
  name: string;
}

export interface ApiStationInfoResponse {
  lastUpdated: number;
  stations: ApiStationInfoItemResponse[];
  success: boolean;
}

export enum ApiStationStatus {
  inactive,
  active,
}

export interface ApiStationStatusItemResponse {
  i: number;
  e: number;
  m: number;
  d: number;
  s: ApiStationStatus.inactive | ApiStationStatus.active;
}

export interface StationStatusApiResponse {
  lastUpdated: number;
  stations: ApiStationStatusItemResponse[];
  success: boolean;
}
