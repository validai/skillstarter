import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: './frontend', // Set the root directory to 'frontend'
  plugins: [react()],
  build: {
    outDir: 'build', // Output directory for the build inside the frontend folder
    rollupOptions: {
      external: ['react-icons/fa'], // Externalize react-icons/fa
    },
  },
});
