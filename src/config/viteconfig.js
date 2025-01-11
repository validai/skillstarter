import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: './frontend', // Set to the directory containing index.html
  build: {
    outDir: './dist', // Output directory for the build
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3000', // Proxy API requests to the backend
    },
  },
});
