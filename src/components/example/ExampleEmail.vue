<template>
    <v-card title="Send Email">
        <v-btn
            color="primary"
            variant="elevated"
            disabled
            @click="sendMail()">
            Send email
        </v-btn>
        #TODO
    </v-card>
</template>

<script setup lang="ts">
    import { useI18n } from 'vue-i18n'

    const { t } = useI18n()
    const sendMail = () => {
        console.log('Hello')
    }
</script>