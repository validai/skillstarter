import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: './', // Ensure the root is set to the project directory
  server: {
    port: 5173, // Set the development server port
  },
  build: {
    outDir: 'build', // Ensure the output directory is set correctly
  },
});
