import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
    state: () => ({
        // Online/Offline
        isOnline: false,

        // PWA
        offlineReady: false,
        needRefresh: false,

        //
        isMobile: null,
        isOffline: null,
        isSaving: false,
        isSaved: false,
        arrIsWaiting: [],
        //
        themeDrawer: false,
    }),
})