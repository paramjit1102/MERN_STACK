import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
const url = "https://chat-app-5xd6.onrender.com/";
// const url = "http://localhost:8000"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: url
      }
    },
  },
});
