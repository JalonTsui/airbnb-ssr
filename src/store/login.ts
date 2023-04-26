import { defineStore } from 'pinia'
export const useLoginState = defineStore('useLoginState', {
    state() {
        return {
            get loginState() {
                const obj: any = {}
                if (!import.meta.env.SSR) {
                    document.cookie.split('; ').forEach(item => {
                        const [key, value] = item.split('=')
                        obj[key] = value
                    })
                }
                if (obj.token) {
                    // 可以追加token验证
                    return true
                } else {
                    return false
                }
            },
            set loginState(val) {
                document.cookie = `token=${val}`
            }
        }
    },
    actions: {
        // 登出时候修改状态
        logout() {
            this.loginState = '' as any
        }
    }
})