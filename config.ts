import mapOptions from './config/mapOptions';
import pkg from './package.json';

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
    mapId: 'mainMap',
    mapOptions,
  },
  api: {
    baseUrl: 'https://negre.co/bicing/api',
    version: 'v1.2',
  },
};

export default config;
