// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    server: {
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    },
  },
});