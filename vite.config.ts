import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: './build',
  },
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:4000',
      '/api/auth': 'http://localhost:4000',
    },
  },
  // viteローカル起動時に TSのPath aliasをViteに受け入れてもらうため
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
