import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: './src', // Adjust the root if needed
  build: {
    outDir: '../dist', // Output directory for your bundled files
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3000', // Proxy API requests to your Express back end
    },
  },
});
