<script setup lang="ts">
import { useHomeSwiper } from '@/store/homeSwiper'
import Pagination from '@/components/comPagination.vue'
import mainTabs from './mainTabs.vue'
import { storeToRefs } from 'pinia'
import { IRoomListParams } from '@/api/interface'
import { useRouter } from 'vue-router'
import { useHomeMsg } from '@/store/homeMsg'

const storeHomeMsg = useHomeMsg()
const store = useHomeSwiper()
const { roomList } = storeToRefs(store)
const router = useRouter()
// 商品详情点击事件
async function clickIt(item: any) {
    // console.log(item.id)
    storeHomeMsg.getRoomDetail({ id: item.id })
    storeHomeMsg.setRoomId(item.id)
    router.push({
        name: 'homeMsg',
        query: {
            id: item.id
        }
    })
}
function changePage(pageNo: number) {
    console.log('父组件', pageNo)
    // store.dispatch('getRoomList', { pageNo } as IRoomListParams)
    store.getRoomList({ pageNo } as IRoomListParams)
}
</script>

<template>
    <!-- 城市筛选 -->
    <mainTabs />
    <!-- 首页列表数据 -->
    <div>
        <div class="home-list">
            <div class="item" @click="clickIt(item)" v-for="(item, index) in roomList" :key="index">
                <img :src="item.pictureUrl" :alt="item.title" />
                <p class="title">{{ item.title }}</p>
                <p class="price">¥{{ item.price }}元</p>
            </div>
        </div>
    </div>

    <!-- 分页 -->
    <Pagination @changePage="changePage" />
</template>

<style scoped></style>
