<template>
    <v-card title="Cloudinary image dropper">
        <CloudinaryDropper
            v-model="imgCloudinary"
            folder="upload/myusername"
            editable
        />
        <v-card-text>
            <v-text-field
                label="Cloudinary folder (empty=root)"
                v-model="uploadFolder"
            />
            <v-select
                :items="cloudinaryImgs"
                variant="outlined"
                clearable
                hide-details
                v-model="imgCloudinary"
            />
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    import CloudinaryDropper from '@/components/CloudinaryDropper.vue'

    let imgCloudinary = ref()
    let uploadFolder = ref()
    const cloudinaryImgs = [
        'sample',
        'portrait/Zahir_hjtden',
        'portrait/Akera_naxlvf',
        'upload/myusername/g15wydr6gh'
    ]

</script>