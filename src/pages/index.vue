<template>
    <div class="pa-8">

        <div class="d-flex flex-wrap" style="gap:10px;">
            <ExampleAuthZero
                class="flex-grow-1"
                style="width: 40%;"
            />
            <ExamplePinia
                class="flex-grow-1 flex-shrink-0"
                style="width: 15%;"
            />
            <ExamplePwa
                class="flex-grow-1"
                style="width: 20%;"
            />
            <ExampleOffline
                class="flex-grow-1"
                style="width: 20%;"
            />
            <ExampleI18n
                class="flex-grow-1"
                style="width: 20%;"
            />
            <ExampleCloudinary
                class="flex-grow-1"
                style="width: 20%;"
            />
            <ExampleThemes
                class="flex-grow-1"
                style="width: 20%;"
            />
            <ExampleWebRtc
                class="flex-grow-1"
                style="width: 20%;"
            />
            <ExampleEmail
                class="flex-grow-1"
                style="width: 15%;"
            />
            <ExamplePdf
                class="flex-grow-1"
                style="width: 15%;"
            />
            <ExampleQrSimple
                class="flex-grow-1"
                style="width: 20%;"
            />
            <ExampleQrFancy
                class="flex-grow-1"
                style="width: 25%;"
            />
            <ExamplePouchDb
                class="flex-grow-1"
                style="width: 20%;"
            />
            <ExampleAssets
                class="flex-grow-1"
                style="width: 10%;"
            />
            <ExampleAAds
                class="flex-grow-1"
                style="width: 1000px;"
            />
        </div>
        
    </div>
    <!-- 
    <SyncedStoreDemo/>
    <HelloWorld />
    -->
    
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    //import YjsDemo from '@/components/YjsDemo.vue'
    import SyncedStoreDemo from '@/components/SyncedStoreDemo.vue'
    import { numberToText } from '@vexna/util'
    import { spellLevelToText } from '@vexna/ttrpg'
    // Published
    import 'vuetify-extra/styles.css'
    //import { useI18n } from 'vue-i18n'

    // EXAMPLES
    import ExampleAuthZero from '@/components/example/ExampleAuthZero.vue'
    import ExamplePinia from '@/components/example/ExamplePinia.vue'
    import ExamplePwa from '@/components/example/ExamplePwa.vue'
    import ExampleI18n from '@/components/example/ExampleI18n.vue'
    import ExampleCloudinary from '@/components/example/ExampleCloudinary.vue'
    import ExampleThemes from '@/components/example/ExampleThemes.vue'
    import ExampleEmail from '@/components/example/ExampleEmail.vue'
    import ExampleWebRtc from '@/components/example/ExampleWebRtc.vue'
    import ExamplePdf from '@/components/example/ExamplePdf.vue'
    import ExamplePouchDb from '@/components/example/ExamplePouchDb.vue'
    import ExampleAssets from '@/components/example/ExampleAssets.vue'
    import ExampleAAds from '@/components/example/ExampleAAds.vue'
    import ExampleQrSimple from '@/components/example/ExampleQrSimple.vue'
    import ExampleQrFancy from '@/components/example/ExampleQrFancy.vue'
    import ExampleOffline from '@/components/example/ExampleOffline.vue'

    //const { t } = useI18n()

    console.log('Testing util',numberToText(1),spellLevelToText(0))

</script>