import { defineStore } from 'pinia'
export const useOrderVisable = defineStore('useOrderVisable', {
    state() {
        return {
            // 控制订单显示隐藏
            orderVisable: false
        }
    },
    actions: {
        setOrderVisable(state: boolean) {
            this.orderVisable = state
        }
    }
})