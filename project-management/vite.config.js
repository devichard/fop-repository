import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react';
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  resolve: {
    alias: {
      '@' : path.resolve(new URL(".", import.meta.url).pathname, './src'),
    },
  },
});
