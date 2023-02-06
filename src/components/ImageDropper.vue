<!-- TODO: CHECK IF WE ARE ACTUALLY ONLINE!!!! -- OR MAKE IT WORK OFFLINE! --->
<template>
    <div height="100%">

        <!-- UPLOAD SECTION -->
        <div
            v-if="editable"
            class="d-flex flex-column"
            style="height: calc( 100% - 64px ); padding:2%; margin:2%"
        >

            <div
                class="pa-6 text-center flex-grow-1"
                :class="{'drop-area':!cMobile, 'drop-area-highlight':dragging, 'drop-area-error':isError}"
                v-cloak @drop.prevent="addDropFile" @dragover.prevent
                style="min-height:230px; max-height:500px;"
                @dragover="dragging=true"
                @drop="dragging=false"
                @dragleave="dragging=false"
            >
                    <div v-if="isError">
                        <v-icon
                            class="mb-6 align-self-center"
                            color="error"
                            size="x-large"
                        >
                            mdi-alert-circle-outline
                        </v-icon>
                        <div class="align-self-center font-weight-light text-error">{{ errorMessage }}</div>
                    </div>
                    <div v-else-if="isUploading">
                        <v-progress-circular indeterminate size="48" width="6" color="primary"/>
                        <div class="mt-3 blue--text">Uploading...</div>
                    </div>

                    <div v-else-if="cMobile">
                        <v-btn
                            class="mt-1 mb-6"
                            color="primary"
                            @click="inputUpload.click()"
                        >
                            {{ t('portrait-dropper.button') }}
                        </v-btn>
                        <input v-show="false" ref="inputUpload" type="file" @change="onFileChange" accept="image/*">
                    </div>

                    <div v-else class="ma-0 d-flex flex-column justify-center" style="height:100%;">
                        <v-icon
                            class="align-self-center"
                            color="grey-lighten-2"
                            size="x-large"
                        >
                            mdi-cloud-upload
                        </v-icon>
                        <div class="mt-2 align-self-center font-weight-light grey--text text--lighten-1">{{ t('portrait-dropper.drop-here') }}</div>
                        <div class="mt-12">
                            <span class="align-self-center font-weight-light grey--text text--lighten-1">{{ t('portrait-dropper.or') }}</span><br>
                            <v-btn
                                class="mt-2"
                                color="primary"
                                @click="inputUpload.click()"
                            >
                                {{ t('portrait-dropper.button') }}
                            </v-btn>
                            <input v-show="false" ref="inputUpload" type="file" @change="onFileChange" accept="image/*">
                        </div>
                    </div>
                    <v-file-input
                        style="display: none;"
                        accept="image/*"
                        hide-input
                        prepend-icon=""
                    />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    import { useI18n } from 'vue-i18n'

    const props = defineProps({
        image: {
            type: String,
            required: false,
        },
        editable: {
            type: Boolean,
            default: false,
        },
        cMobile: {
            type: Boolean,
            default: false,
        },
        isError: {
            type: Boolean,
            default: false,
        },
        errorMessage: {
            type: String,
            default: "Error uploading to the cloud"
        },
        isUploading: {
            type: Boolean,
            default: false,
        },
    })

    const inputUpload = ref()

    const emit = defineEmits(['upload'])

    const { t } = useI18n()
    //const indUploading = ref(false)
    const dragging = ref(false)

    function addDropFile(x:DragEvent) {
        if (x.dataTransfer) {
            //const fileUpload:DataTransfer = x.dataTransfer
            //emit('upload',fileUpload)
            emit('upload',x.dataTransfer)
        }
    }
    function onFileChange() {
        
    }

</script>

<script lang="ts">
    export default {
        /*
        props: {
            image: {
                //character.file_cloudinary
                //`https://res.cloudinary.com/CLOUD_NAME/image/upload/${character.file_cloudinary}`
                //`https://res.cloudinary.com/CLOUD_NAME/image/upload/fl_attachment/${character.file_cloudinary}`
                type: String,
                required: false
            },
            editable: {
                type: Boolean,
                default: false,
            },
            cMobile: {
                type: Boolean,
                default: false,
            }
        },
        methods: {
                ///const addDropFile = (x) => {
            addDropFile(x:object) {
                const fileUpload = x.dataTransfer.files[0]
                console.log('hello addDropFile',fileUpload)
                this.indUploading = true
                this.$emit('upload',fileUpload)
                //this.addFile(file)
            },
            onFileChange() {
                console.log('hello onFileChange')
            },
        }
        */
    }
</script>

<style scoped>
    .drop-area {
        border: 2px solid rgb(var(--v-theme-primary));
        border-style: dotted;
        border-radius: 8px;
        background-color: rgb(var(--v-theme-primary-darken-4),0.08);
    }
    .drop-area-error {
        border: 2px solid rgb(var(--v-theme-error));
        border-style: dotted;
        background-color: rgb(var(--v-theme-error),0.08);
    }
    .drop-area-highlight {
        background-color: rgb(var(--v-theme-primary-darken-4),0.4);
    }

</style>