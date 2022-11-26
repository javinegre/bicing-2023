import pkg from '../package.json';

const config = {
  version: pkg.version,
  isDev: import.meta.env.MODE === 'development',
  isProd: import.meta.env.MODE === 'production',
  vendor: {
    google: {
      maps: {
        apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
      },
    },
  },
};

export default config;
