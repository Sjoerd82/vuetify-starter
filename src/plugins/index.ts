/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import { loadFonts } from './webfontloader'
import vuetify from './vuetify'
import pinia from '../stores'
import router from '../router'
import { createHead } from "@vueuse/head"
import { createAuth0 } from '@auth0/auth0-vue'
import i18n from './i18n'
import onoffline from './onoffline'

// Types
import type { App } from 'vue'

// Auth0
const authZeroDomain = import.meta.env.VITE_AUTH0_DOMAIN
const authZeroClientId = import.meta.env.VITE_AUTH0_CLIENT_ID

export function registerPlugins (app: App) {
    loadFonts()
    app
        .use(vuetify)
        .use(router)
        .use(pinia)
        .use(i18n)
        .use(createHead())
        .use(
            createAuth0({
                domain: authZeroDomain,
                client_id: authZeroClientId,
                redirect_uri: window.location.origin
            }))
        .use(onoffline)
}