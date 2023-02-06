<template>
    <v-card title="QR code (simple)">
        <v-card-text>

            <div class="mb-2" v-html="myQrCode"/>

            <v-text-field
                type="number"
                :min="0" :max="40"
                hint="0-40; 0=Automatic"
                persistent-hint
                v-model.number="typeNumber"
            />
            <v-select
                :items="errorCorrectionLevels"
                item-value="level"
                item-title="title"
                v-model="errorCorrectionLevel"
            />

            <v-textarea
                v-model="message"
            />

            <div class="text-caption text-grey">
                https://en.wikipedia.org/wiki/QR_code
            </div>

        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
    import { ref, watch } from 'vue'
    import _ from 'lodash'
    import qrcode from 'qrcode-generator' //, { TypeNumber, ErrorCorrectionLevel }
    import type { Ref } from 'vue'

    // Reed-Solomon error correction levels
    // https://en.wikipedia.org/wiki/QR_code
    const errorCorrectionLevels = [
        { level:"L", title:"Low (max. ~7% damaged)" },
        { level:"M", title:"Medium (max. ~15% damaged)" },
        { level:"Q", title:"Quartile (max. ~25% damaged)" },
        { level:"H", title:"High (max. ~30% damaged)" },
    ]
    const errorCorrectionLevel: Ref<ErrorCorrectionLevel> = ref('M')
    const typeNumber: Ref<TypeNumber> = ref(0)

    let message = ref("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod")
    let myQrCode = ref()

    // Initialize
    makeQrCode()

    // Watch for changes
    watch(message, _.throttle(() => {
        makeQrCode()
    }, 400))

    watch(typeNumber, () => {
        makeQrCode()
    })

    watch(errorCorrectionLevel, () => {
        makeQrCode()
    })

    // Make a QR code
    function makeQrCode() {
        let qr = qrcode(typeNumber.value, errorCorrectionLevel.value)
        qr.addData(message.value)
        qr.make()
        myQrCode.value = qr.createImgTag(7,20)
    }

</script>