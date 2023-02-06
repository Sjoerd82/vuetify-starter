<template>
    <v-card>
        <template #title>
            <div class="d-flex justify-space-between">
                <div>Themes</div>
                <v-spacer/>
                <v-btn
                    v-if="$vuetify.theme.name != 'DarkTheme'"
                    icon
                    flat
                    @click="setTheme('DarkTheme')"
                >
                    <v-icon>mdi-weather-night</v-icon>
                </v-btn>
                <v-btn
                    v-if="$vuetify.theme.name != 'LightTheme'"
                    icon
                    flat
                    @click="setTheme('LightTheme')"
                >
                    <v-icon>mdi-weather-sunny</v-icon>
                </v-btn>
            </div>
        </template>
        <div class="pa-4">
            Current theme: <code>{{ $vuetify.theme.name }}</code>
            <div style="background: rgba(var(--v-theme-primary));">
                x
            </div>
            <br>
            Select a theme:
            <v-btn @click="themeSelector=!themeSelector">Select</v-btn>
        </div>
    </v-card>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    //import { storeToRefs } from 'pinia'
    //import { useAppStore } from '@/stores/app'
    import { useTheme } from 'vuetify'
    import _ from 'lodash'

    //const appStore = useAppStore()

    // Themes
    const theme = useTheme()
    const themeSelector = ref(false)
    let arrThemes = []
    Object.entries(theme.computedThemes.value).forEach(([k,v]) => {
        arrThemes.push({
            name: k,
            title: _.snakeCase(k).replace("_"," "),
            variant: (k == theme.global.name.value) ? 'outlined' : '',
            background: v.colors.background,
            primary: v.colors.primary,
            secondary: v.colors.secondary,
            text: (v.dark) ? '#ffffff' : '#000000',
            mode: (v.dark) ? 'dark' : 'light',
            dark: v.dark,
        })
    })

    const setTheme = (themeName:string) => {
        theme.global.name.value = themeName
    }

</script>