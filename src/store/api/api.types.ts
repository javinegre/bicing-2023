export interface ApiStationInfoItemResponse {
  id: number;
  lat: number;
  lng: number;
  name: string;
}

export interface ApiStationInfoResponse {
  success: boolean;
  lastUpdated?: number;
  stations?: ApiStationInfoItemResponse[];
  errorMessage?: string;
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
  success: boolean;
  lastUpdated?: number;
  stations?: ApiStationStatusItemResponse[];
  errorMessage?: string;
}
