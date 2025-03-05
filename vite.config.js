import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

import * as stream from 'stream-browserify';

const { Readable } = stream;

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // 将'@'映射到src目录
      'stream': 'stream-browserify'
    },
  },
  define: {
    global: 'window',
  },
  server: {
    host: '0.0.0.0',
    port: 6266,
  }
});
