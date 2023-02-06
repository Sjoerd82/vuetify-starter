<template>
    <v-select
        Xclass="{'nkd':naked}"
        class="nkd"
        :items="languages"
        item-title="name"
        item-value="code"
        hide-details
        v-model="$i18n.locale"
    >
        <template #selection="{ item }">
            <CountryFlag
                v-if="flag && !flagRight"
                class="mr-2"
                style="margin-top:-8px;"
                :country="item.raw.flagCode"
            />
            <span v-if="selectionPrefix" class="mr-2">{{ selectionPrefix }}:</span>
            <span>{{ item.title }}</span>
            <CountryFlag
                v-if="flag && flagRight"
                class="ml-2"
                style="margin-top:-8px; margin-right:-4px;"
                :country="item.raw.flagCode"
            />
        </template>

        <template #item="{ item }">
            <v-list-item
                :title="item.title"
                @click="$i18n.locale = item.value"
            >
                <template #prepend>
                    <CountryFlag
                        v-if="flag || flagItems"
                        class="mr-2"
                        style="margin-top:-8px;"
                        :country="item.raw.flagCode"
                    />
                </template>
            </v-list-item>
        </template>
    </v-select>
</template>

<script setup lang="ts">
    import { languages } from '../plugins/i18n'
    import CountryFlag from 'vue-country-flag-next'
</script>
<script lang="ts">
    export default {
        props: {
            selectionPrefix: {
                // "Language:"
                // The build-in prefix has a different color, this one does not
                type: String,
                required: false,
            },
            flag: {
                type: Boolean,
                default: false,
            },
            flagRight: {
                type: Boolean,
                default: false,
            },
            flagItems: {
                // Items will have a flag depending on "flag"-property
                // This boolean can override the "flag"-property
                type: Boolean,
                required: false,
            },
            naked: {
                // No margins at all + transparent
                // set variant to solo!
                type: Boolean,
                default: false,
            }
        }
    }
</script>
<!--
<style scoped>
    .nkd :deep(.v-field__input) {
            padding: 0;
            min-height: auto;
        }
    .nkd :deep(.v-field) {
            padding: 0;
            align-items: center;
            background-color: transparent;
        }
    .nkd :deep(.v-field__append-inner) {
            padding: 0;
        }
    
</style>
-->