import type { StationStatusApiResponse } from './api.types';
import config from '@config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { StationInfo, StationStatus } from 'src/types';

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
        const stationListRaw = rawResult.stations ?? [];

        const stations = stationListRaw.map(({ i, e, m, d, s }) => ({
          id: i,
          electrical: e,
          mechanical: m,
          docks: d,
          status: s,
        }));

        return {
          success: rawResult.success,
          lastUpdated: rawResult.lastUpdated,
          stations: stations,
          errorMessage: rawResult.errorMessage,
        };
      },
    }),
  }),
});

export const { useStationInfoQuery, useStationStatusQuery } = apiSlice;
