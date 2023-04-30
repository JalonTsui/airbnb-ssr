<script lang='ts'>
import { defineComponent } from 'vue'
import { t } from '@/utils/internationalization'
import { useLang } from '@/store/conLang'
import { storeToRefs } from 'pinia'
import mainList from './components/mainList.vue'
import { IRoomListParams } from '@/api/interface'

export default defineComponent({
    components: {
        mainList
    },
    setup() {
        const storeLang = useLang()
        const { lang: langNow } = storeToRefs(storeLang)
        return {
            t,
            langNow
        }
    },
    asyncData({ storeHomeSwiper }: any) {
        // console.log('预取数据' + new Date().getTime())
        const { pageNo } = storeHomeSwiper
        return storeHomeSwiper.getRoomList({ pageNo } as IRoomListParams)
    }
})
</script>
<template>
    <div class="home-page">
        <!-- banner -->
        <div class="banner"></div>
        <!-- 房屋列表 -->
        <div class="main-wapper">
            <h2 class="title">{{ t(langNow).home.h2Title }}</h2>
            <p class="sub-title">{{ t(langNow).home.subTitle }}</p>
            <!-- 首页列表 -->
            <mainList />
        </div>
    </div>
</template>
<style lang='scss'>
@import "@/assets/scss/home/mainContent/index.scss";
</style>