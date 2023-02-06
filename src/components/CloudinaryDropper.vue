
<template>
    <div>
        <!-- Image -->
        <v-hover v-if="image">
            <template #default="{ isHovering, props }">
                <v-img
                    class="rounded"
                    :src="image"
                    height="100%"
                    max-height="100%"
                    v-bind="props"
                >
                    <v-fade-transition>
                        <div
                            v-if="isHovering"
                            class="portrait-buttons-v2"
                        >
                            <v-btn
                                v-if="editable"
                                size="small"
                                dark
                                color="primary"
                                icon="mdi-circle-slice-8"
                            >
                            </v-btn>

                            <!-- 
                                Due to CORS, we cannot do this for a different origin (ie not a locally hosted image):
                                :href="image" download
                            -->
                            <v-btn
                                v-if="editable"
                                class="mx-2"
                                size="small"
                                dark
                                color="primary"
                                icon="mdi-download"
                                @click="downloadImage()"
                            />

                            <v-btn
                                v-if="editable"
                                size="small"
                                dark
                                color="red"
                                icon="mdi-delete"
                                @click="tagImage()"
                            >
                            </v-btn>
                        </div>
                    </v-fade-transition>
                </v-img>
            </template>
        </v-hover>

        <!-- DROPPER -->
        <ImageDropper
            Xv-else
            class="mb-2"
            Ximage="(props.modelValue) ? `${cloudinaryUpload}/${props.modelValue}` : undefined "
            :isUploading="isUploading"
            :isError="isError"
            :errorMessage="errorMessage"
            editable
            @upload="uploadToCdy"
        />
        <pre v-if="returnVal" class="text-caption">{{ returnVal }}</pre>
    </div>
</template>

<script setup lang="ts">
    import { ref, computed, ComputedRef, nextTick } from 'vue'
    import ImageDropper from '@/components/ImageDropper.vue'
    import cdy from '@/services/cloudinary'
    import download from 'downloadjs'

    // Environment (.env)
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
    const cloudinaryUpload = `https://res.cloudinary.com/${cloudName}/image/upload`

    //import Cloudinary, { CldImage, CldVideo, CldTransformation, CldContext } from "cloudinary-vue";

    const props = defineProps({
        modelValue: {
            type: String,
            required: false,
        },
        editable: Boolean,
        cMobile: Boolean,
        maxFileCount: {
            type: Number,
            default: 1,
        },
        folder: {
            type: String,
            required: false,
        }
    })

    const emit = defineEmits(['update:modelValue'])

    const image: ComputedRef<string|undefined> = computed((): (string|undefined) => (props.modelValue) ? `${cloudinaryUpload}/${props.modelValue}` : undefined)

    let isUploading = ref(false)
    let isError = ref(false)
    let errorMessage = ref()
    let returnVal = ref()

    // Upload files, up to the maximum number allowed (default 1)
    const uploadToCdy = async (fileUpload:DataTransfer) => {
        isUploading.value = true
        for (let i=0; i < fileUpload.files.length; i++) {
            if ( i >= props.maxFileCount) {
                return
            }
            const fileToUpload = fileUpload.files[i]
            try {
                const options = {
                    folder: props.folder,
                    generateFileName: true,
                }
                returnVal.value = await cdy.uploadFile(fileToUpload, options)
                console.log('NO ERROR')
                const fileName = `${returnVal.value.public_id}.${returnVal.value.format}`
                //props.modelValue = returnVal.value.public_id
                emit('update:modelValue', fileName)
            } catch(e: any) {
                // #TODO: define e in TS
                errorMessage.value = `Oh no! ${e.message}`
                isError.value = true
                console.log('ERROR CAUGHT:', e.message)
            }
        }
        await nextTick()
        // Give the impression some work has done... less than half a second delay.
        //setTimeout(function(){
        //    isUploading.value = false
        //}, 100)
        isUploading.value = false
    }


    // Download image
    // Because of CORS restrictions we cannot download from a different host.
    // We can copy the image data and start a new download from here.
    const downloadImage = () => {
        if (image.value && props.modelValue) {
            // WE CANNOT SET THE FILE NAME WHEN THROUGHPUTTING A LINK IN THIS WAY
            // In order to override the filename, the image needs to be fetch()'ed and converted to blob first.
            download(image.value)
        }
    }

    const deleteImage = async () => {
        console.log(props.modelValue)
        const publicId = props.modelValue
        //await cdy.deleteFileSig(publicId)

        if (!publicId) {
            return
        }

        try {
            //const options = {
            //    folder: props.folder,
            //    generateFileName: true,
            //}
            returnVal.value = await cdy.deleteFile(publicId)
            const fileName = `${returnVal.value.public_id}.${returnVal.value.format}`
            emit('update:modelValue', fileName)
        } catch(e: any) {
            // #TODO: define e in TS
            errorMessage.value = `Oh no! ${e.message}`
            isError.value = true
        }
        
    }

    const tagImage = async () => {
        console.log(props.modelValue)
        const publicId = props.modelValue
        //await cdy.deleteFileSig(publicId)

        if (!publicId) {
            return
        }

        try {
            //const options = {
            //    folder: props.folder,
            //    generateFileName: true,
            //}
            returnVal.value = await cdy.tagFile(publicId,'deleted')
            const fileName = `${returnVal.value.public_id}.${returnVal.value.format}`
            emit('update:modelValue', fileName)
        } catch(e: any) {
            // #TODO: define e in TS
            errorMessage.value = `Oh no! ${e.message}`
            isError.value = true
        }
        
    }

</script>


<style scoped>
.portrait-buttons-v2 {
  /*display:none;
  visibility: hidden; */
  position:absolute;
  bottom:18px; right:20px;
  /* opacity: 1;
  transition: opacity .35s ease; */
}
</style>