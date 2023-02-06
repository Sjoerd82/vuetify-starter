# Opinionated Project Template: Vuetify

# About

This repository is hosted on github: https://github.com/Sjoerd82/vuetify-starter
This project template is build on top of the `pnpm create vuetify` starter and consists of:

* Package manager:
	pnpm
* Bundler:
	Vite 4
- Framework:
	- Vue 3
	- Vuetify 3
	- Typescript
- Routing:
	- Vue-Router 4
	- Vite-Plugin-Pages (File Based Routing)
- State:
	- Pinia
- PWA:
	- Vite-plugin-PWA
- Other:
	- @vueuse/head
	- vite-plugin-mkcert (local https)
	- vitest

## Batteries included

Additionally adding (and easily removable):

- Auth0
- I18n (v9)
- PDF-Lib
- Lodash
- Download.js
- PouchDB and Dexie
- QR code generator (basic and fancy)
- Y.js CRDT
- Cloudinary (a 1GB free cloud image hoster)

### Databases

You are probably not both going to need Dexie and PouchDB. Use Dexie to acces the browser's indexeddb, or use PouchDb if you're wanting to sync with a CouchDB database.

### ToDo

* Email solution
* vue-flagpack (Q3-2023)
* Imagekit (20GB/20GB) ~> VUE3: March 2023

# Installation

Install by cloning a git repository (and removing the references to it).

```cmd
npx degit sjoerd82/vuetify-starter my-vuetify-app
cd my-vuetify-app
pnpm install
```

- [ ] Change the author name in `LICENSE`
- [ ] Setup your own favicons and metadata
- [ ] Setup the PWA manifest
- [ ] Setup Auth0

# Setting up

### Favicon & metadata

A good starting point for your favicons is https://realfavicongenerator.net/. Ideally you use a SVG as starting point.

This site does not create the PWA-images, altough it does create android-chrome images, which can be used instead. Copy-paste the android-chrome-images (192x192 and 512x512) to:
* public/pwa-192x192.png	
* public/pwa-512x512.png

In App.vue we enter our site metadata.

`src/App.vue`
```ts
    useHead({
        title: 'My Awesome Application',
        meta: [
            { name: 'description', content: 'My awesome application does this.' },
            {
                name: 'theme-color',
                content: '#ffffff',
            },
            {
                name: 'msapplication-TileColor',
                content: '#00aba9',
            },
        ],
        link: [
            {
                rel: 'apple-touch-icon',
                type: 'image/png',
                sizes: '180x180',
                href: '/apple-touch-icon.png',
            },
            {
                rel: 'icon',
                type: 'image/png',
                sizes: '32x32',
                href: '/favicon-32x32.png',
            },
            {
                rel: 'icon',
                type: 'image/png',
                sizes: '16x16',
                href: '/favicon-16x16.png',
            },
            {
                rel: 'manifest',
                href: '/site.webmanifest',
            },
            {
                rel: 'mask-icon',
                type: 'image/svg+xml',
                href: '/safari-pinned-tab.svg',
                color: '#5bbad5',
            },
        ],
    })
```

### Local HTTPS

In order to test the PWA locally, we require a local HTTPS server. We can change the port number in the vite.config.ts.

`vite.config.ts`
```ts
  server: {
    https: true,
    port: 8000,
  },
```

Documentation: https://github.com/liuweiGL/vite-plugin-mkcert

### PWA

In this template, PWA is setup according to the following principles:

* Hourly update check
* Prompt before update *(use this mode if your site has forms and want to prevent the user from loosing its changes -- if all your content is static, you probably want to change this to autoUpdate)*
* We use the standard generated service worker (the default setting). When you require more customization, you will need to switch to injectManifest and provide your own service worker.

- [ ] Setup the PWA manifest
- [ ] Change the update check interval in `src/main.ts`, if hourly is not what you want

### PWA manifest (app name, colors, etc.)

The PWA manifest lives here, see https://developer.mozilla.org/en-US/docs/Web/Manifest for an in-depth explanation of the fields.

*vite_config.ts*
```ts
    VitePWA({
        manifest: {
            name: 'My Awesome App (Manifest)',
            short_name: 'MyApp',
            description: 'My Awesome App description',
            categories: ['productivity','todo'],
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
                    "sizes": "1280x64",
                    "type": "image/webp",
                    "platform": "wide",
                    "label": "Homescreen of Awesome App"
                  },
            ],
        },
    }),
  ],
```


#### Update interval

Here you can change the interval in miliseconds, for example 60 x 1000 is every minute, 60 x 60 x 1000 is every hour.

*src/main.ts*
```ts
    onRegistered(r) {
        // Executed once, at start

        // The browser checks for updates on reloads / route changes.
        // If a user stays on a same page for long updates can be missed.
        // If you need to have these updates, we can manually check for updates:
        //const intervalMS = 60 * 60 * 1000 // hourly
        const intervalMS = 60 * 1000 // every minute (testing this functionality)

        r && setInterval(() => {
            // Executed every intervalMS
            r.update()
        }, intervalMS)
    },
```


### Auth0

- [ ] Create an auth0 account
- [ ] Auth0: Create an application (select type: "Single Page Web Application")
- [ ] Auth0: Add localhost to the "**Allowed Callback URLs**", "**Allowed Logout URLs**", and "**Allowed Web Origins**" , for development mode.
	- [ ] http://localhost:8000, https://localhost:8000
- [ ] Set domain and client_id in `.env`

`.env.local`
```env
VITE_AUTH0_DOMAIN="your-domain-here.auth0.com"
VITE_AUTH0_CLIENT_ID="your-client-id-here"
```

`plugins/index.ts`
```ts
import { createAuth0 } from '@auth0/auth0-vue'

// Auth0
const authZeroDomain = import.meta.env.VITE_AUTH0_DOMAIN
const authZeroClientId = import.meta.env.VITE_AUTH0_CLIENT_ID

.use(
  createAuth0({
	domain: authZeroDomain,
	client_id: authZeroClientId,
    redirect_uri: window.location.origin
  })
)
```

Make sure that the localhost port matches with your auth0 application.

#### Optional steps

- [ ] Auth0: Set application logo (about 150x150 pixels). Already included is: public/auth0-badge.png
- [ ] Auth0: Application description. (used for what?)

### Cloudinary

Add your Cloudinary account details to the .env file. The API secret should be server side only (without VITE_-prefix), but this does prevent serverless usage.

`env.local`
```
VITE_CLOUDINARY_CLOUD_NAME="your-clound-name"
VITE_CLOUDINARY_UPLOAD_PRESET="your-unsigned-upload-preset"
VITE_CLOUDINARY_API_KEY="your-api-key"
VITE_CLOUDINARY_API_SECRET="your-api-secret" # SHOULD BE: CLOUDINARY_API_SECRET (without VITE_), to assure it doesn't end up client-side.
```


# Further configuration and usage

Now that you have personalized your template, you can continue adding your pages, internationalization, and themes.

### Pinia

A global app store has been created, and can be used for generic app-wide variables.

`stores/app.ts`
```ts
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
    state: () => ({
        // PWA
        offlineReady: false,
        needRefresh: false, 
        //
        isMobile: null,
        isOffline: null,
        isSaving: false,
        isSaved: false,
        arrIsWaiting: [],
    }),
})
```

To use a store (in this example we use the app store):
```ts
import { useAppStore } from '@/stores/app'

// Set one...
const store = useAppStore()
store.needRefresh = true

// ...or get multiple
const { needRefresh, offlineReady } = useAppStore()
```


Pinia documentation: https://pinia.vuejs.org/


### Pages

New pages can be added to the `src/pages` directory.
Documentation: X

### Internationalization

Translations can be added to in the `src/locales` directory.
Documentation:

### Themes

Vuetify-Starter comes with four example themes, and a theme switcher. Themes can be altered and  added by configuring `src/plugins/vuetify.ts`.

### QR codes

The examples showcase both the standard and fancy styles.

If you require no QR codes you can remove both `qrcode-generator` and `qr-code-styling`.
```
pnpm remove qrcode-generator qr-code-styling
```

If you require standard QR code (black and white, square), you can remove qr-code-styling.
```
pnpm remove qr-code-styling
```

Standard
https://github.com/kazuhikoarase/qrcode-generator

Stylized
https://github.com/kozakdenys/qr-code-styling