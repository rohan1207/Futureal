// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  preview: {
    allowedHosts: ['futureal.onrender.com']
  },
  // Add this section to generate a _redirects file for Render
  build: {
    rollupOptions: {
      // Add a plugin to create a _redirects file in the dist folder
      plugins: [
        {
          name: 'generate-redirects',
          writeBundle() {
            const fs = require('fs');
            const path = require('path');
            const redirectsPath = path.resolve(__dirname, 'dist', '_redirects');
            fs.writeFileSync(redirectsPath, '/* /index.html 200\n');
            console.log('Created _redirects file for SPA routing');
          }
        }
      ]
    }
  }
});