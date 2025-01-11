import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: './frontend', // Set the root directory to 'frontend'
  plugins: [react()],
  build: {
    outDir: 'dist', // Output directory for the build
  },
});
