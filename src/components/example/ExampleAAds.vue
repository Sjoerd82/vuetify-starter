<template>
    <v-card title="Ads">
        <v-card-text class="d-flex">
            <div class="flex-shrink-0 flex-grow-1">
                <div
                    class="mb-4"
                    :style="`background-image:url(pattern.jpg); background-repeat:repeat; width:${adSize.dimensions.width}px; height:${adSize.dimensions.height}px;`">
                    #Ad {{ adSize.title }}
                </div>
                <div class="mb-4">
                    <iframe
                        v-if="adSize.data"
                        :data-aa="adSize.data"
                        :src="`//ad.a-ads.com/${adSize.data}?size=${adSize.dimensions.width}x${adSize.dimensions.height}`"
                        :style="`width:${adSize.dimensions.width}px; height:${adSize.dimensions.height}px; border:0px; padding:0; overflow:hidden; background-color: transparent;`">
                    </iframe>
                </div>
            </div>
            <v-radio-group v-model="adSize">
                <v-radio
                    v-for="(size,index) in adSizes" :key="index"
                    :label="size.title"
                    :value="size"
                >
                </v-radio>
            </v-radio-group>
            <!--
            <v-select
                :items="adSizes"
                item-title="title"
                item-value="dimensions"
                return-object
                dense
                v-model="adSize"
            >
            </v-select>
            -->

        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    //import { useI18n } from 'vue-i18n'
    //const { t } = useI18n()

    const adSizes = [
        { title:"120x60" , dimensions: {width:120, height:60 }, data:2149770 },
        { title:"120x600", dimensions: {width:120, height:600}, data:2149771 },
        { title:"125x125", dimensions: {width:125, height:125}, data:2149772 },
        { title:"160x600", dimensions: {width:160, height:600}, data:2149773 },
        { title:"200x200", dimensions: {width:200, height:200}, data:2149775 },
        { title:"240x400", dimensions: {width:240, height:400}, data:2149776 },
        { title:"250x250", dimensions: {width:250, height:250}, data:2149777 },
        { title:"300x250", dimensions: {width:300, height:250}, data:2149778 },
        { title:"300x600", dimensions: {width:300, height:600}, data:2149779 },
        { title:"320x50" , dimensions: {width:320, height:50 }, data:2149781 },
        { title:"320x100", dimensions: {width:320, height:100}, data:2149782 },
        { title:"336x280", dimensions: {width:336, height:280}, data:2149768 },
        { title:"468x60" , dimensions: {width:468, height:60 }, data:2149783 },
        { title:"728x90" , dimensions: {width:728, height:90 }, data:2149785 },
        { title:"970x90" , dimensions: {width:970, height:90 }, data:2149729 },
        { title:"970x250", dimensions: {width:970, height:250}, data:2149786 },
    ]
    let adSize = ref(adSizes[13])
</script>