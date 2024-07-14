import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'https://muaythaibhur-server.onrender.com/', // Change this to your Express server's port\
      '/uploads': 'https://muaythaibhur-server.onrender.com/'
    },
  },
})
