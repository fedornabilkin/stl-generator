import {fileURLToPath, URL} from 'node:url'
import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [
    vue(),
  ],
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      // https://rollupjs.org/configuration-options/
      output: {
        manualChunks: {
          core: [
            'vue',
            'vue-i18n',
            'vue-router',
            'moment',
          ],
          tree: [
            'three',
            'three-csg-ts',
            'three-text-geometry',
          ],
          network: [],
          utils: [
            'jszip',
            'vue-qrcode-reader',
            'vcards-js',
            'qrcode',
            'path-that-svg',
            'deepmerge',
            'deep-object-diff',
          ],
          ui: [
            // 'bulma',
          ],
          icons: [
            '@fortawesome/fontawesome-free',
          ],
        },
      },
    },
  },
  server: {
    watch: {
      usePolling: true
    },
    host: true,
    strictPort: true,
    port: 5174
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
