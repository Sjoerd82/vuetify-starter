<template>
    <v-card>
        <template #title>
            <div class="d-flex justify-space-between">
                <div>Auth0</div>
                <v-chip
                    v-if="isAuthenticated"
                    label color="success"
                >
                {{ t('auth.authenticated') }}
                </v-chip>
                <v-chip v-else
                    label color="error"
                >
                {{ t('auth.not-authenticated') }}
                </v-chip>
            </div>
        </template>
        <div class="pa-4">

            <pre v-if="isAuthenticated">
                {{ user }}
            </pre>
            <div class="d-flex align-center">
                <v-btn
                    class="mx-2"
                    color="primary"
                    :variant="(isAuthenticated) ? 'text' : 'elevated'"
                    :disabled="isAuthenticated"
                    @click="loginWithRedirect()"
                >
                    {{ t('button.login') }}
                </v-btn>

                <v-btn
                    class="mx-2"
                    variant="outlined"
                    :disabled="!isAuthenticated"
                    @click="logoutWithRedirect()"
                >
                    {{ t('button.logout') }}
                </v-btn>
                <v-spacer/>
                <div v-if="isAuthenticated" class="text-secondary">
                    {{ t('auth.logged-in-as', {name: user.given_name}) }}
                </div>
            </div>
        </div>
    </v-card>
</template>

<script setup lang="ts">
    import { useI18n } from 'vue-i18n'
    import { useAuth0 } from '@auth0/auth0-vue'
    const { t } = useI18n()
    const { loginWithRedirect, logout, user, isAuthenticated  } = useAuth0()
    const logoutWithRedirect = () => {
        logout({ returnTo: window.location.origin })
    }
</script>