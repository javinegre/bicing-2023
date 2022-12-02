import mapOptions from './config/mapOptions';
import pkg from './package.json';
import { MarkerColorConfig } from 'src/types';

const config = {
  version: pkg.version,
  isDev: import.meta.env.MODE === 'development',
  isProd: import.meta.env.MODE === 'production',
  vendor: {
    google: {
      maps: {
        apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        apiUrl: 'https://maps.googleapis.com/maps/api/js',
      },
    },
  },
  app: {
    mapOptions,
    nearbyAreaRadius: {
      lat: 0.0030375,
      lng: 0.00405,
    },
    mapMarkerSizeZoomThreshold: 14,
    markerColor: {
      inactive: {
        threshold: 0,
        color: 'gray',
      },
      none: {
        threshold: 0,
        color: 'black',
      },
      danger: {
        threshold: 2,
        color: 'red',
      },
      warning: {
        threshold: 5,
        color: 'orange',
      },
      success: {
        threshold: Infinity,
        color: 'green',
      },
    } as MarkerColorConfig,
    nearbyAreaHintDiameter: {
      14: 95,
      15: 190,
      16: 380,
    } as { [zoom: number]: number },
  },
  api: {
    baseUrl: 'https://negre.co/bicing/api',
    version: 'v1.3',
  },
};

export default config;
