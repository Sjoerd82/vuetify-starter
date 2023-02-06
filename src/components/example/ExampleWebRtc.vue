<template>
    <v-card>
        <template #title>
            <div class="d-flex justify-space-between">
                <div>WebRTC (EasyRtc)</div>
                <v-chip label X-if="isConnected" color="success">Connected</v-chip>
                <v-chip label X-else color="error">Disconnected</v-chip>
            </div>
        </template>
        <v-card-text>


        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import type { Ref } from 'vue'
    // @ts-ignore
    //import * as easyrtc from 'open-easyrtc'
    //import easyrtc from 'open-easyrtc'
    //import { easyrtc } from 'open-easyrtc'
    //import { sendDataWS } from 'open-easyrtc'
    //console.log(easyrtc)

</script>