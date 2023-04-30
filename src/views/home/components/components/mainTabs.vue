<script setup lang="ts">
import { useHomeSwiper } from '@/store/homeSwiper'
import { storeToRefs } from 'pinia'
// import { useI18n } from 'vue-i18n'
import { t } from '@/utils/internationalization'
import { useLang } from '@/store/conLang'
import { IRoomListParams } from '@/api/interface'

const store = useHomeSwiper()
const storeLang = useLang()
const { lang: langNow } = storeToRefs(storeLang)
// const { t } = useI18n()
// const cityCode = ref(store.state.cityCode)
const { cityCode } = storeToRefs(store)
const cityArr = [{
    cityCode: 'hz',
    cityName: '杭州'
}, {
    cityCode: 'sh',
    cityName: '上海'
}, {
    cityCode: 'nj',
    cityName: '南京'
}, {
    cityCode: 'cd',
    cityName: '成都'
}, {
    cityCode: 'cq',
    cityName: '重庆'
}, {
    cityCode: 'bj',
    cityName: '北京'
}, {
    cityCode: 'sz',
    cityName: '苏州'
}]
function cityClick(tab: any) {
    // console.log(tab)
    const { name } = tab.props
    cityCode.value = name
    // store.dispatch('getRoomList', { pageNo: 1, cityCode: name } as IRoomListParams)
    store.getRoomList({ pageNo: 1, cityCode: name } as IRoomListParams)
}
</script>

<template>
    <!-- 城市筛选 -->
    <el-tabs v-model="cityCode" @tab-click="cityClick" type="card" style="margin-bottom: 2rem;">
        <el-tab-pane v-for="(item, index) in cityArr" :key="index" :label="t(langNow).home.city[`${item.cityCode}`]"
            :name="item.cityCode"></el-tab-pane>
    </el-tabs>
</template>

<style scoped></style>
