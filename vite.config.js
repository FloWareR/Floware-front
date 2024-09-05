import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  
  base: '/Floware-front/',
  build: {
    outDir: 'dist', 
    emptyOutDir: true, 
    rollupOptions: {
      output: {
          
      }
    }
  },

  server: {
    host: true,
  }
});
