import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const PORT = process.env.PORT || 3000;

// https://vite.dev/config/
export default defineConfig({
  root: __dirname,
  plugins: [react()],
  build: {
    outDir: "../dist",
  },
  server: {
    proxy: {
      "/api": {
        target: `http://localhost:${PORT}`,
        changeOrigin: true,
      },
    },
  },
})