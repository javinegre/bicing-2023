import config from '@config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface ApiStationInfoItemResponse {
  id: number;
  lat: number;
  lng: number;
  name: string;
}

interface ApiStationInfoResponse {
  lastUpdated: number;
  stations: ApiStationInfoItemResponse[];
  success: boolean;
}

export type StationInfoItem = ApiStationInfoItemResponse;
export type StationInfo = ApiStationInfoResponse;

interface ApiStationStatusItemResponse {
  i: number;
  e: number;
  m: number;
  d: number;
  s: number;
}

interface StationStatusApiResponse {
  lastUpdated: number;
  stations: ApiStationStatusItemResponse[];
  success: boolean;
}

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

const baseUrl = `${config.api.baseUrl}/${config.api.version}`;

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    stationInfo: builder.query<StationInfo, 'station-info'>({
      query: () => '/station-info',
    }),
    stationStatus: builder.query<StationStatus, 'station-status'>({
      query: () => '/station-status',
      transformResponse: (rawResult: StationStatusApiResponse) => {
        const stations = rawResult.stations.map(({ i, e, m, d, s }) => ({
          id: i,
          electrical: e,
          mechanical: m,
          docks: d,
          status: s,
        }));

        return {
          lastUpdated: rawResult.lastUpdated,
          success: rawResult.success,
          stations: stations,
        };
      },
    }),
  }),
});

export const { useStationInfoQuery, useStationStatusQuery } = apiSlice;
