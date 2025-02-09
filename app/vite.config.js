import {fileURLToPath, URL} from 'node:url'
import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";
import WorkerPlugin from "worker-plugin";
// const WorkerPlugin = require('worker-plugin');

export default defineConfig({
  plugins: [
    vue(),
    WorkerPlugin
  ],
  server: {
    watch: {
      usePolling: true
    },
    host: true,
    strictPort: true,
    port: 5173
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: `@import "./src/assets/scss/main.scss";`
      }
    }
  }
})
