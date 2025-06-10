import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      srcDir: 'src',
      filename: 'sw.js', // твой кастомный sw-файл
      strategies: 'injectManifest',
      injectRegister: 'auto',
      // devOptions: {
      //   enabled: true, // 👈 ВАЖНО!
      //   type: 'module', // если ты используешь sw как модуль
      // },
      manifest: {
        name: 'My App',
        short_name: 'App',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [],
      },
    })
  ],
})
