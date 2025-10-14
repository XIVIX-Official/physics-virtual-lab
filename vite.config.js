import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@physics': '/src/physics',
      '@simulations': '/src/simulations',
      '@hooks': '/src/hooks',
      '@pages': '/src/pages',
      '@styles': '/src/styles'
    },
    extensions: ['.js', '.jsx', '.json']
  },
  server: {
    port: 3000,
    open: true
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx'
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
});
