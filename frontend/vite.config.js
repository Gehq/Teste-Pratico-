import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Em desenvolvimento, /api e /assets são encaminhados para a API .NET.
const API = 'http://localhost:5080';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: { '/api': API, '/assets': API },
  },
  build: { outDir: 'dist', emptyOutDir: true, assetsDir: 'static' },
});
