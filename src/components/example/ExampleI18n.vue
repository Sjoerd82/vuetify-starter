<template>
    <v-card>
        <v-card-title class="d-flex justify-space-between">
            <div>I18n</div>
            <v-spacer/>
            <v-menu>
                <template #activator="{ props }">
                    <v-btn
                        icon
                        size="small" flat
                        v-bind="props"
                    >
                        <v-icon size="large">mdi-dots-vertical</v-icon>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item
                        prepend-icon="mdi-account-circle"
                        @click="''"
                    >
                        <v-list-item-title>Menu item 1</v-list-item-title>
                    </v-list-item>
                    <v-list-item
                        prepend-icon="mdi-lightning-bolt-circle"
                        @click="''"
                    >

                        <v-list-item-title>Menu item 2</v-list-item-title>
                    </v-list-item>
                    <v-divider/>
                    <v-list-item
                        prepend-icon="mdi-translate"
                        @click.stop="''"
                    >
                    <YSwitchLang
                        class="pa-0"
                        :languages="languages"
                        :prefixInner="t('site.language')"
                        naked
                        flag-select-location="right"
                        flag-items-location="none"
                        variant="solo"
                        v-model="$i18n.locale"
                    />
                    </v-list-item>
                    <v-list-item
                        prepend-icon="mdi-translate"
                        @click.stop="''"
                    >
                        <YSwitchLang
                            class="pa-0"
                            :languages="languages"
                            naked
                            variant="solo"
                            v-model="$i18n.locale"
                        />
                    </v-list-item>
                    <v-list-item
                        prepend-icon="mdi-translate"
                        @click.stop="''"
                    >
                        <YSwitchLang
                            class="pa-0"
                            :languages="languages"
                            :prefixInner="t('site.language')"
                            naked
                            flag-select-location="none"
                            variant="solo"
                            v-model="$i18n.locale"
                        />
                    </v-list-item>
                    <v-divider/>
                    <v-list-item
                        prepend-icon="mdi-chart-donut"
                        @click="''"
                    >
                        <v-list-item-title>Menu item 6</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-card-title>
        <v-card-text>

            <YSwitchLang
                :languages="languages"
                variant="outlined"
                v-model="$i18n.locale"
            />

        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
    import { useI18n } from 'vue-i18n'
    import { languages } from '@/plugins/i18n'
    import { YSwitchLang } from "vuetify-extra"
    import 'vuetify-extra/styles.css'

    const { t } = useI18n()

    //const appStore = useAppStore()
    //const { themeDrawer } = storeToRefs(appStore)
</script>