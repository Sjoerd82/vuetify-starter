/**
 * plugins/onoffline.ts
 *
 */
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/stores/app'

export default {
    install: () => {

        const appStore = useAppStore()
        const { isOnline } = storeToRefs(appStore)

        // initialize
        isOnline.value = window.navigator.onLine

        window.addEventListener('online', function handleOnline(e) {
            isOnline.value = true
        })
        
        window.addEventListener('offline', function handleOffline(e) {
            isOnline.value = false
        })
    }
}