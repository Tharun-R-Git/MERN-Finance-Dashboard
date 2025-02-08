import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
  server: {
    port: 5173, // Ensure this port matches the client port
    strictPort: true,
    host: "localhost",
    watch: {
      usePolling: true, // Fixes issues on some systems
    },
    hmr: {
      protocol: "ws",
      host: "localhost",
      port: 5173, // Ensure it's the same as the port above
    },
  },
})
