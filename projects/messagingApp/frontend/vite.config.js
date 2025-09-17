import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';

// need to import the full library find the .env file since its not just in the root such as backend is
import dotenv from "dotenv";
dotenv.config({path: "./backend/database/.env"});

// dynamically change port to whatever i need it to be for the api proxy
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