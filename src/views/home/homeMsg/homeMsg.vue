<script  lang="ts">
import { defineComponent } from 'vue'
import RoomDetail from './components/roomDetail.vue'
import { IRoomDetailParams } from '@/api/interface'
// import { useRouter } from 'vue-router'

export default defineComponent({
    components: {
        RoomDetail
    },
    setup() {
        // const router = useRouter()
        // console.log('setup--------router', router)
    },
    asyncData({ storeHomeMsg, route }: any) {
        // console.log('asyncData----详情页', storeHomeMsg, route.value)
        const { roomId } = storeHomeMsg
        const { id } = route.value.query
        // console.log('roomId----------', roomId)
        // console.log('id-------', id)
        storeHomeMsg.setRoomId(roomId || id)
        return storeHomeMsg.getRoomDetail({ id: roomId || id } as IRoomDetailParams)
    }
})
</script>

<template>
    <RoomDetail />
</template>

<style lang='scss'>
@import "@/assets/scss/homeMsg/index.scss";
</style>
