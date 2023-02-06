import { createI18n } from 'vue-i18n'
import messages from '@intlify/unplugin-vue-i18n/messages'

export default createI18n({
    legacy: false,
    locale: 'nl', // Current locale
    messages
})
export const languages = [
    {
        code: "en",
        name: "English",
        flagCode: "usa",
    },
    {
        code: "nl",
        name: "Nederlands",
        flagCode: "nl",
    }
]
