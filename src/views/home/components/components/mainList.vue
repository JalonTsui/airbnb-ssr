<script setup lang="ts">
import { useHomeSwiper } from '@/store/homeSwiper'
import Pagination from '@/components/comPagination.vue'
import mainTabs from './mainTabs.vue'
import { storeToRefs } from 'pinia'
import { IRoomListParams } from '@/api/interface'

const store = useHomeSwiper()
const { roomList } = storeToRefs(store)
function clickIt(item: any) {
    console.log(item)
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
