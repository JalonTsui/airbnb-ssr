<script setup lang='ts'>
import { ref, inject } from 'vue'
import { t } from '@/utils/internationalization'
import { useRouter } from 'vue-router'
const router = useRouter()
const emits = defineEmits(['onChangeLanguage'])
const localeLanguage: string = inject('localeLanguage') || ''
const activeIndex = ref('1')
// 点击nav的事件
// key就是和keyPath都是index，一个展示第一层，一个以数组展示全部层级
// 在没有使用的变量前面加_可以让报错消除
const handleSelect = (key: string, keyPath: string[]) => {
    // 房源和订单信息orders
    if (key === "orders") {
        console.log(key)
    }
    // 历史足迹records
    if (key === "records") {
        console.log(key)
    }
    // 登录和注册login
    if (key === 'login') {
        router.push('login')
    }
    // 如果是改变语言的时候
    if (keyPath[0] === "language") {
        emits('onChangeLanguage', keyPath[1])
    }
}
// 跳转回主页
function toHome() {
    router.push('/')
}
</script>
<template>
    <div class="contain">
        <div class="imgContain">
            <img src="@/assets/image/topNav/topNav.png" @click="toHome" />
        </div>
        <div class="navContain">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
                :ellipsis="true">
                <el-menu-item index="orders">{{ t(localeLanguage).header.orders }}</el-menu-item>
                <el-menu-item index="records">{{ t(localeLanguage).header.records }}</el-menu-item>
                <el-sub-menu index="language">
                    <template #title>{{ t(localeLanguage).header.language }}</template>
                    <el-menu-item index="zh">中文</el-menu-item>
                    <el-menu-item index="en">English</el-menu-item>
                </el-sub-menu>
                <el-menu-item index="login">{{ t(localeLanguage).header.login }}</el-menu-item>
            </el-menu>
        </div>
    </div>
</template>
<style scoped lang="scss">
@import "@/assets/scss/comTopNav/index.scss";
</style>