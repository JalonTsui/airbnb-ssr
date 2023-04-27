<script setup lang="ts">
// import { computed } from 'vue'
import { useHomeSwiper } from '@/store/homeSwiper'
import { storeToRefs } from 'pinia'

const store = useHomeSwiper()
// const { pageNo: storePageNo, pageSize: storePageSize, total: storeTotal } = storeToRefs(store)
const { pageNo, pageSize, total } = storeToRefs(store)
// const pageNo = computed(() => storePageNo)
// const pageSize = computed(() => storePageSize)
// const total = computed(() => storeTotal)
/* eslint-disable */
const emit = defineEmits<{
    (e: 'changePage', pageNo: number): void
}>()

function changePage(pageNo: number) {
    console.log('子组件', pageNo)
    emit('changePage', pageNo)
}
</script>

<template>
    <el-pagination v-model:currentPage="pageNo" :page-size="pageSize" :total="total" background layout="prev,pager,next"
        @current-change="changePage" style="justify-content: center;"></el-pagination>
</template>

<style scoped></style>
