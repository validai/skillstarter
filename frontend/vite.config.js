import dotenv from 'dotenv';
dotenv.config();

if (typeof globalThis.structuredClone !== 'function') {
  globalThis.structuredClone = (obj) => JSON.parse(JSON.stringify(obj));
}

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: './', // Ensure the root is set to the project directory
  server: {
    port: parseInt(process.env.VITE_PORT) || 5173, // Use environment variable for port if available
    host: process.env.VITE_HOST || 'localhost', // Use environment variable for host if available
  },
  build: {
    outDir: 'build', // Ensure the output directory is set correctly
    rollupOptions: {
      input: 'index.html', // Specify the entry point for the build process
    },
  },
});