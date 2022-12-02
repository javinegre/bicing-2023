import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import mkcert from 'vite-plugin-mkcert';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';
  const envPlugins = isProd ? [] : [mkcert()];

  return {
    server: { https: true },
    plugins: [tsconfigPaths(), react(), ...envPlugins],
  };
});
