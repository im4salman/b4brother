import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Optimize bundle size
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'animation-vendor': ['framer-motion'],
          'chart-vendor': ['chart.js', 'react-chartjs-2'],
          'icons-vendor': ['react-icons']
        }
      }
    },
    // Compress assets
    minify: 'esbuild',
    // Reduce chunk size warning limit
    chunkSizeWarningLimit: 1600
  },
  // Optimize dev server
  server: {
    hmr: {
      overlay: false // Disable error overlay in dev
    }
  },
  // Add source maps for debugging in production
  sourcemap: false // Disable in production for smaller builds
})
