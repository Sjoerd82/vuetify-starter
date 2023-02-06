<template>
    <v-card title="Assets">
        <v-card-text>
            Assets are files that are processed by the bundler, must be prefixed with @/assets (dev works, but build will fail if not prefix this way)<br>
            <v-img src="@/assets/logo.png"/>
            <v-img src="@/assets/pwa-512x512.png"/>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
</script>