import { defineStore } from 'pinia'
import { fetchRoomList } from '@/api/index'
import { IRoomListParams } from '@/api/interface'
// 为 store state 声明类型
export interface AllStateTypes {
    count: number,
    roomList: Array<any>,
    pageNo: number,
    pageSize: number,
    total: number,
    cityCode: string
}
export const useHomeSwiper = defineStore('useHomeSwiper', {
    state(): AllStateTypes {
        return {
            // ?
            count: 1,
            // 房屋列表
            roomList: [],
            // 当前页
            pageNo: 1,
            // 一页多少数据
            pageSize: 6,
            // 一共多少条数据
            total: 0,
            // 当前选择的城市
            cityCode: 'hz'
        }
    },
    actions: {
        // 设置房屋列表数据
        setRoomList(list: any) {
            this.roomList = list
            return this.roomList
        },
        // 操作count?
        setCount(payload: number) {
            this.count += payload
            return this.count
        },
        // 改变count
        fetchCount(payload: number) {
            setTimeout(() => {
                this.setCount(payload)
            }, 3000)
        },
        // 获取房屋列表数据
        getRoomList(payload: IRoomListParams) {
            const { pageNo, cityCode = this.cityCode } = payload
            this.pageNo = pageNo
            const params = {
                pageNo,
                pageSize: this.pageSize,
                cityCode
            }
            return new Promise(resolve => {
                fetchRoomList(params).then(res => {
                    const { success, result } = res
                    const orders = result.orders
                    const total = result.total
                    if (success) {
                        // console.log('保存到homeSwiper中', orders.data)
                        // commit('setRoomList', orders.data)
                        this.setRoomList(orders.data)
                        this.total = total
                        resolve(true)
                    }
                })
            })
        }
    }
})