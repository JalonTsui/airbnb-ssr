import { defineStore } from 'pinia'
export const useLang = defineStore('useLang', {
    state() {
        return {
            // lang: 'zh-cn'
            get lang() {
                if (localStorage.getItem('lang')) {
                    return localStorage.getItem('lang') as ('zh-cn' | 'en')
                } else {
                    localStorage.setItem('lang', 'zh-cn')
                    return 'zh-cn'
                }
            },
            set lang(val: ('zh-cn' | 'en')) {
                localStorage.setItem('lang', val)
            }
        }
    },
    actions: {
        changeLang(lang: ('zh-cn' | 'en')) {
            this.lang = lang
        }
    }
})