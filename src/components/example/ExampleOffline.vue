<template>
    <v-card title="Offline test">
        <v-table
            class="pa-4"
            dense
        >
            <tbody>
                <tr>
                    <td>Browser reports:</td>
                    <td>
                        <v-chip
                            v-if="isOnline"
                            label
                            color="success"
                        >
                            Online
                        </v-chip>
                        <v-chip
                            v-else
                            label
                            color="error"
                        >
                            Offline
                        </v-chip>
                    </td>
                </tr>
                <tr>
                    <td>PWA reports:</td>
                    <td>#TODO</td>
                </tr>
                <tr>
                    <td>Axios/Fetch:</td>
                    <td>#TODO</td>
                </tr>
                <tr>
                    <td>Ping:</td>
                    <td>#TODO</td>
                </tr>
            </tbody>
        </v-table>
    </v-card>
</template>

<script setup lang="ts">
    import { storeToRefs } from 'pinia'
    import { useAppStore } from '@/stores/app'
    const appStore = useAppStore()
    const { isOnline } = storeToRefs(appStore)
</script>