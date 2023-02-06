<template>
    <v-card title="Pinia">
        <v-btn
            color="primary"
            class="ma-4"
            @click="themeDrawer=!themeDrawer"
        >
            Theme drawer
        </v-btn>
    </v-card>
</template>

<script setup lang="ts">
    import { storeToRefs } from 'pinia'
    import { useAppStore } from '@/stores/app'
    import { useI18n } from 'vue-i18n'

    const appStore = useAppStore()
    const { themeDrawer } = storeToRefs(appStore)
</script>