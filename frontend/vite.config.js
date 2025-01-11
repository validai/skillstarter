import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  build: {
    outDir: 'build',  // Ensure the output directory is set to 'build'
    rollupOptions: {
      input: './index.html'  // Ensure this path is correct
    }
  }
});
