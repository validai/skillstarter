import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    open: true
  },
  build: {
    rollupOptions: {
      input: '/path/to/your/entry/file.js' // Update this path to your actual entry file
    }
  }
});
