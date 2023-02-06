<template>
    <v-card title="QR code (stylized)">
        <v-card-text>


            <div
                class="d-flex justify-space-between"
            >
                <div class="mb-2" ref="qrCodeDom"> </div>
                <v-spacer/>
                <v-radio-group
                    v-model="qrStyle"
                    @change="setStyle()"
                >
                <v-radio
                        label="Standard"
                        :value="0"
                    />
                    <v-radio
                        label="Theme"
                        :value="1"
                    />
                    <v-radio
                        label="Vue"
                        :value="2"
                    />
                </v-radio-group>
            </div>
            
            <!-- v-if because typescript believes typeNumber and errorCorrectionLevel could be undefined-->
            <template v-if="qrOpts.qrOptions">
                <v-text-field
                    type="number"
                    :min="0" :max="40"
                    hint="0-40; 0=Automatic"
                    persistent-hint
                    v-model.number="qrOpts.qrOptions.typeNumber"
                />
                <v-select
                    :items="errorCorrectionLevels"
                    item-value="level"
                    item-title="title"
                    v-model="qrOpts.qrOptions.errorCorrectionLevel"
                />
            </template>

            <v-textarea
                v-model="qrOpts.data"
            />

            <div class="text-caption text-grey">
                https://en.wikipedia.org/wiki/QR_code
                https://github.com/kozakdenys/qr-code-styling
                https://qr-code-styling.com/
            </div>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
    import { ref, onMounted, watch } from 'vue'
    import _ from 'lodash'
    //import QRCodeStyling from 'qr-code-styling'
    import QRCodeStyling, {
        DrawType,
        TypeNumber,
        Mode,
        ErrorCorrectionLevel,
        DotTypes,
        DotType,
        CornerSquareType,
        CornerDotType
        //Extension
     }
         from 'qr-code-styling'
    import type { Ref } from 'vue'
    import type { Options } from 'qr-code-styling'

    // Reed-Solomon error correction levels
    // https://en.wikipedia.org/wiki/QR_code
    const errorCorrectionLevels = [
        { level:"L", title:"Low (max. ~7% damaged)" },
        { level:"M", title:"Medium (max. ~15% damaged)" },
        { level:"Q", title:"Quartile (max. ~25% damaged)" },
        { level:"H", title:"High (max. ~30% damaged)" },
    ]

    // DOM
    let qrCodeDom = ref()


    // Options
    let qrOpts: Ref<Options> = ref({
        qrOptions: {
            typeNumber: 0 as TypeNumber,
            errorCorrectionLevel: "M" as ErrorCorrectionLevel,
            mode: "Byte" as Mode,
        },
        width: 300,
        height: 300,
        margin: 20,
        type: "svg" as DrawType,
        data: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod", //message.value,

        imageOptions: {
            crossOrigin: "anonymous",
            margin: 20
        }
    })
    let qr = new QRCodeStyling(qrOpts.value)

    onMounted(() => {
        setStyle()
        // the DOM element will be assigned to the ref after initial render
        qr.append(qrCodeDom.value)
      })

    // Watch for changes
    watch(qrOpts, _.throttle((newVal) => {
        qr.update(qrOpts.value)
    }, 400),{deep:true})

    const qrStyles: Array<Options> = [
        // Standard
        {
            image: "",
            dotsOptions: {
                color: "#000000", 
                type: "square" as DotType,
            },
            cornersSquareOptions: {
                color: "#000000",
                type: "square" as CornerSquareType,
            },
            cornersDotOptions: {
                color: "#000000",
                type: "square" as CornerDotType,
            },
            backgroundOptions: {
                color: "#ffffff",
            },
        },
        // Theme color (inverted)
        {
            image: "pwa-192x192.png",
            dotsOptions: {
                color: "rgba(var(--v-theme-primary-darken-1))",
                type: "extra-rounded" as DotType,
            },
            cornersSquareOptions: {
                color: "rgba(var(--v-theme-primary))",
                type: "extra-rounded" as CornerSquareType,
            },
            cornersDotOptions: {
                color: "rgba(var(--v-theme-primary))",
                type: "square" as CornerDotType,
            },
            backgroundOptions: {
                color: "transparent",
            },
        },
        // Basic Vue color scheme
        {
            image: "pwa-192x192.png",
            dotsOptions: {
                color: "#35495e",
                type: "rounded" as DotType,
            },
            cornersSquareOptions: {
                color: "#42b883",
                type: "extra-rounded" as CornerSquareType,
            },
            cornersDotOptions: {
                color: "#42b883",
                type: "square" as CornerDotType,
            },
            backgroundOptions: {
                color: "#ffffff",
            },
        },
        // Inverted
    ]
    const qrStyle = ref(1)

    function setStyle() {
        qrOpts.value = {
            ...qrOpts.value,
            ...qrStyles[qrStyle.value],
        }
        qr.update(qrOpts.value)
    }

</script>