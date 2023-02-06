// Plugins
import vue from '@vitejs/plugin-vue'

// Vuetify
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// Pages (File Based Routing)
import Pages from 'vite-plugin-pages'

// I18n
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

// Vite PWA
import { VitePWA } from 'vite-plugin-pwa'

// Local HTTPS
import mkcert from'vite-plugin-mkcert'

// Utilities
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import { resolve, dirname } from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue({ 
            template: { transformAssetUrls }
        }),
        // https://github.com/hannoeru/vite-plugin-pages#configuration
        Pages({
            extensions: ['vue', 'md'],
        }),
        // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
        vuetify({
            autoImport: true,
        }),
        VueI18nPlugin({
            // locale messages resource pre-compile option
            include: resolve(dirname(fileURLToPath(import.meta.url)), './src/locales/*.yml'),
        }),
        VitePWA({
            /* Service Worker Registration (injectRegister)
            *   > Automatic (default)
            *     https://vite-pwa-org.netlify.app/guide/register-service-worker.html
            *
            * Service Worker Precache
            *     Cache only
            *     Network only (no offline mode)
            *     Cache first, falling back to network
            *     Network first, falling back to cache
            *   > Stale-while-revalidate <-- ?
            * 
            *     "sw.js" contains the cached files+revision codes
            * 
            * Minimal requirements
            *     In development mode we use https-localhost on a production build.
            *     https-localhost fulfills the https and http-forward requirements.
            * 
            * Service Worker Strategies (workbox mode)
            *     There are two strategies (generateSw, injectManifest)
            *     The "workbox-build"-section is used in generation.
            *     
            *   > generateSW
            *     https://vite-pwa-org.netlify.app/workbox/generate-sw.html
            * 
            *     The plugin generates the code for the service worker.
            *     The generated code can be found in \dist\sw.js (?)
            *     
            *     injectManifest
            *     https://vite-pwa-org.netlify.app/workbox/inject-manifest.html
            *     Provides a customized service worker
            * 
            * Service Worker Behaviors
            *     There are two behaviors (prompt, autoUpdate)
            * 
            *   > prompt
            *     Will ask user to update (load next version of the serviceworker)
            *     This prevents data-loss from a user that is filling out a form
            * 
            *     autoUpdate
            *     Will update as soon as a new version is available
            * 
            * Manifest
            *     Provides information about the App
            *     https://developer.mozilla.org/en-US/docs/Web/Manifest
            */
            injectRegister: 'auto',       // Register the service worker; 'inline' | 'script' | null | 'auto' (DEFAULT)
            registerType: 'prompt',       //'autoUpdate' | 'prompt' (DEFAULT)
            includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg', 'safari-pinned-tab.svg'],
            manifest: {
                // https://developer.mozilla.org/en-US/docs/Web/Manifest
                name: 'My Awesome PWA App',
                short_name: 'MyApp',
                description: 'My Awesome App description',
                categories: ['entertainment','games','role-playing','rpg','tabletop'],
                start_url: '/',
                display: 'fullscreen',
                orientation: 'any',
                theme_color: '#000000',
                background_color: "#000000",
                // #REVIEW THIS:
                icons: [
                    {
                        src: 'pwa-192x192.png',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: 'pwa-512x512.png',
                        sizes: '512x512',
                        type: 'image/png'
                    },
                    {
                        src: 'pwa-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'any maskable'
                    }
                ],
                screenshots: [
                    {
                        "src": "screenshot.webp",
                        "sizes": "1280x640",
                        "type": "image/webp",
                        "platform": "wide",
                        "label": "Homescreen of Awesome App"
                      },
                ],
            },
            strategies: 'generateSW',     // 'injectManifest' | 'generateSW' (DEFAULT)
            workbox: {                    // Workbox
                sourcemap: true,          // Debugging
                //globPatterns: ['**/*.{js}'] // css,html,ico,png,svg,yml Also precache .ico, .png, .svg (DEFAULT: js,css,html)
            },
        /*
        // #FUTURE (web push, ...?)
            strategies: 'injectManifest',
            srcDir: 'src',
            filename: 'sw.ts'
        */
        devOptions: {
            enabled: true
        }
        }),
        // https://github.com/liuweiGL/vite-plugin-mkcert
        mkcert(),
    ],
  define: { 'process.env': {}, global: "window", },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      //'open-easyrtc': resolve(dirname(fileURLToPath(import.meta.url)), './src/services/easyrtc.js'),
      //'open-easyrtc': resolve(dirname(fileURLToPath(import.meta.url)), "node_modules/open-easyrtc/api/easyrtc.js"),
      //'socket.io': resolve(dirname(fileURLToPath(import.meta.url)), "node_modules/socket.io-client/dist/socket.io.slim.js"),
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],
  },
  server: {
    https: true,
    port: 8000,
  },
})
