<template>
    <v-card title="PWA">
        <v-table
            class="pa-4"
            dense
        >
            <tbody>
                <tr>
                    <td>needRefresh:</td>
                    <td>{{needRefresh}}</td>
                </tr>
                <tr>
                    <td>offlineReady:</td>
                    <td>{{offlineReady}}</td>
                </tr>
            </tbody>
        </v-table>
    </v-card>
</template>

<script setup lang="ts">
    import { storeToRefs } from 'pinia'
    import { useAppStore } from '@/stores/app'
    import { useI18n } from 'vue-i18n'

    const appStore = useAppStore()
    const { needRefresh, offlineReady } = storeToRefs(appStore)
</script>