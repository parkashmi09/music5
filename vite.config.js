import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  build: {
    outDir: 'dist',
    rollupOptions: {
      // Ensure the _redirects file is properly copied to the build directory
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
})
