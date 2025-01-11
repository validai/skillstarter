import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: './', // Ensure the root is set to the project directory
  server: {
    port: process.env.PORT || 5173, // Use environment variable for port if available
  },
  build: {
    outDir: 'build', // Ensure the output directory is set correctly
    rollupOptions: {
      input: 'index.html', // Specify the entry point for the build process
    },
  },
});
