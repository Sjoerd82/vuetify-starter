<template>
    <v-app>
        <v-app-bar class="px-6 d-flex justify-space-between">
            <v-icon>mdi-hamburger</v-icon>
            <v-spacer/>
            <v-icon>mdi-account</v-icon>
        </v-app-bar>
        <Transition name="themeswitcher">
            <div
                v-if="themeDrawer"
                class="themeswitcher"
            >
                <YSwitchTheme
                    class="mb-12"
                    :themes="theme.computedThemes.value"
                    :translation="t"
                    v-model="theme.global.name.value"
                />
                <v-btn
                    class="ma-1 themeswitcher__close"
                    icon flat
                    @click="themeDrawer=false"
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </div>
        </Transition>
        <v-main>
            <RouterView/>
            <ReloadPrompt/>
        </v-main>
    </v-app>
</template>

<script setup lang="ts">
    import { storeToRefs } from 'pinia'
    import { useAppStore } from '@/stores/app'
    import { useHead } from '@vueuse/head'
    import { useTheme } from 'vuetify'
    import { YSwitchTheme } from "vuetify-extra"
    import 'vuetify-extra/styles.css'
    import { useI18n } from 'vue-i18n'
    import ReloadPrompt from '@/components/ReloadPrompt.vue'

    // Pinia state
    const appStore = useAppStore()
    const { themeDrawer } = storeToRefs(appStore)

    // Vueuse/head
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

    // Internationalization
    const { t } = useI18n()

    // Themes
    const theme = useTheme()

</script>

<style scoped>

.themeswitcher {
    height: 160px;
    overflow: hidden;
    background: rgba(var(--v-theme-surface-darken-1));
    /* If VAppBar present, add 64px to place it under the VAppBar.
       VAppBar is fixed and has no template slot to place it above the bar. */
    position: relative;
    top: 64px;
}

.themeswitcher__close {
    position: absolute;
    top:0; right:0;
    background-color: transparent;
}

.themeswitcher-enter-active {
    animation: slideY 220ms ease-in-out;
}
.themeswitcher-leave-active {
    animation: slideY 180ms ease-in-out reverse;
}

@keyframes slideY {
  from {
    height: 0;
  }
  to {
    height: 160px;
  }
}
</style>