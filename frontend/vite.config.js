import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: './src', // Ensure the root is set to the correct directory containing index.html
  server: {
    port: 5173, // Set the development server port
  },
  build: {
    outDir: 'build', // Ensure the output directory is set correctly
    rollupOptions: {
      input: 'src/index.html', // Specify the entry point for the build process
    },
  },
});
