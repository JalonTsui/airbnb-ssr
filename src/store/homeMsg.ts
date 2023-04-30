import { defineStore } from 'pinia'
import { fetchRoomDetail } from '@/api/homeMsg'
import { IRoomDetailParams } from '@/api/interface'
export const useHomeMsg = defineStore('useHomeMsg', {
    state() {
        return {
            roomDetail: {} as any,
            roomId: null
        }
    },
    actions: {
        setRoomDetail(roomDetail: any) { // 设置房屋详情数据
            this.roomDetail = roomDetail
            return this.roomDetail
        },
        setRoomId(roomId: any) { // 设置房屋ID
            this.roomId = roomId
            return this.roomId
        },
        // 房屋详情接口
        getRoomDetail(payload: IRoomDetailParams) {
            return new Promise(resolve => {
                fetchRoomDetail(payload).then((res: any) => {
                    const { success, result } = res
                    if (success) {
                        // console.log('详情页数据保存到Vuex中', result)
                        // commit('setRoomDetail', result)
                        this.setRoomDetail(result)
                        resolve(true)
                    }
                })
            })
        }
    }
})