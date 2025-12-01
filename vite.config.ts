import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-hot-toast'],
          'charts': ['recharts'],
          'supabase': ['@supabase/supabase-js'],
          'utils': [
            'axios',
            'papaparse'
          ]
        }
      }
    },
    chunkSizeWarningLimit: 600
  }
});
