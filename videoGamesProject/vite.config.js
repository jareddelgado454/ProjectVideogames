import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://video-games-backend-bvsvhx9kk-jared-delgados-projects.vercel.app',
        changeOrigin: true,
      },
    },
  },
})
