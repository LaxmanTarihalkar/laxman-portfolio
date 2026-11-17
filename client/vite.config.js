import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite config. The dev server proxies /api to the Express backend so the
// frontend and backend share an origin in development (cookies work).
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
