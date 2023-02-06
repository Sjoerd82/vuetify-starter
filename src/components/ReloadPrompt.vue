<template>
  <div
    v-if="offlineReady || needRefresh"
    class="pwa-toast"
    role="alert"
  >
    <div class="message">
      <span v-if="offlineReady">
        App ready to work offline
      </span>
      <span v-else>
        New content available, click on reload button to update.
      </span>
    </div>
    <button v-if="needRefresh" @click="updateSw()">
        <!-- {{ $t('message.reload') }} -->i18n
    </button>
    <button @click="close">
      Close
    </button>
  </div>
</template>

<script lang="ts">
import { useRegisterSW } from 'virtual:pwa-register/vue'

export default {
    setup() {
    //const offlineReady = ref(null)
    //const needRefresh = ref(null)

    console.log('ReloadPrompt.vue > useRegisterSW()')
    const {
        offlineReady,
        needRefresh,
        updateServiceWorker,
    } = useRegisterSW()

    const close = async () => {
        offlineReady.value = false
        needRefresh.value = false
    }
    /*
    const { t } = useI18n({
        legacy: false,
        locale: $i18n.locale,
        messages: {
            "en": {
                "offlineReady": "App ready to work offline",
                "refreshNeeded": "New content available, click on @:message.reload button to update.",
                "reload": "Reload",
                "close": "Close",
            },
            "nl": {
                "offlineReady": "App gereed voor offline gebruik",
                "refreshNeeded": "Nieuw content beschikbaar, klik de @:message.reload knop om te verversen.",
                "reload": "Update",
                "close": "Sluiten",
            }
        }
    })
    */

    return {
        //t,
        offlineReady,
        needRefresh,
        updateServiceWorker,
        close,
    }
},
methods: {
    test() {
      const {
        offlineReady,
        needRefresh,
      } = useRegisterSW()
      console.log("test!", offlineReady.value, needRefresh.value)
    },
    updateSw() {
      console.log('yup')
      this.updateServiceWorker()
    }
  }
}
</script>
<!--
<i18n>
{
    "en": {
        "offlineReady": "App ready to work offline",
        "refreshNeeded": "New content available, click on @:message.reload button to update.",
        "reload": "Reload",
        "close": "Close",
    },
    "nl": {
        "offlineReady": "App gereed voor offline gebruik",
        "refreshNeeded": "Nieuw content beschikbaar, klik de @:message.reload knop om te verversen.",
        "reload": "Update",
        "close": "Sluiten",
    }
}
</i18n>
-->
<style>
.pwa-toast {
  position: fixed;
  right: 0;
  bottom: 0;
  margin: 16px;
  padding: 12px;
  border: 1px solid #8885;
  border-radius: 4px;
  z-index: 1;
  text-align: left;
  box-shadow: 3px 4px 5px 0 #8885;
  background-color: white;
}
.pwa-toast .message {
  margin-bottom: 8px;
}
.pwa-toast button {
  border: 1px solid #8885;
  outline: none;
  margin-right: 5px;
  border-radius: 2px;
  padding: 3px 10px;
}
</style>
