import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Lokal development'da /api so'rovlarini FastAPI backend'ga yo'naltiradi
    proxy: {
      '/api': 'http://localhost:8000',
    },
  },
})
