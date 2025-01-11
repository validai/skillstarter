import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    open: true
  },
  build: {
    rollupOptions: {
      input: 'src/main.jsx' // Ensure this path is correct
    }
  }
});
