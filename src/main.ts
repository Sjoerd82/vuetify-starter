/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 * 
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

// Pinia main store
import { useAppStore } from '@/stores/app'

// VitePWA (see vite.config.ts)
import { registerSW } from 'virtual:pwa-register'

const updateSW = registerSW({
    // PWA callbacks
    onNeedRefresh() {
        // Executed when new content detected
        console.log('NEEDS REFRESH')
        const store = useAppStore()
        store.needRefresh = true
    },
    onOfflineReady() {
        // Executed ????????????????
        console.log('OFFLINE READY')
    },
    onRegistered(r) {
        // Executed once, at start

        // The browser checks for updates on reloads / route changes.
        // If a user stays on a same page for long updates can be missed.
        // If you need to have these updates, we can manually check for updates:
        //const intervalMS = 60 * 60 * 1000 // hourly
        const intervalMS = 60 * 60 * 1000 // every minute (testing this functionality)

        r && setInterval(() => {
            // Executed every intervalMS
            r.update()
        }, intervalMS)
    },
    onRegisterError(error) {
        console.error('Error registering Service Worker:',error)
    }
})
// END

const app = createApp(App)

registerPlugins(app)

app.mount('#app')
