import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    port: 5173, // Added port configuration from the other file
  },
  build: {
    rollupOptions: {
      input: 'src/main.jsx' // Ensure this path is correct
    },
    outDir: 'dist', // Ensure this matches the directory you want to serve
  }
});
