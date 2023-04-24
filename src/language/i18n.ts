// i18n.ts
import { createI18n } from 'vue-i18n'
import zh from './zh'

const i18n = createI18n({
    // 组合式api一定要使用legacy：false
    legacy:false,
    locale: 'zh',
    messages: {
        zh
    }
})
export default i18n
