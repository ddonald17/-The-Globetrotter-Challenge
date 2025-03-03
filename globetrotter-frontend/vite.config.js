import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    host: true, // Ensures it works on remote servers
    port: 5173, // Default Vite dev server port
  },
  preview: {
    allowedHosts: ['the-globetrotter-challenge-lt1n.onrender.com'], // Allow Render domain
    host: true, // Ensures it's accessible
    port: 4173, // Default preview port
  },
});
