<script setup lang='ts'>
/* global ElMessage */
import { ref, inject } from 'vue'
import { storeToRefs } from 'pinia'
import { t } from '@/utils/internationalization'
import { useRouter } from 'vue-router'
import { userLogoutApi } from '@/api/login'
// 获取当前登录状态
import { useLoginState } from '@/store/login'
const storeLoginState = useLoginState()
const { loginState } = storeToRefs(storeLoginState)
const router = useRouter()
const emits = defineEmits(['onChangeLanguage'])
const localeLanguage: string = inject('localeLanguage') || ''
const activeIndex = ref('1')
// 点击nav的事件
// key就是和keyPath都是index，一个展示第一层，一个以数组展示全部层级
// 在没有使用的变量前面加_可以让报错消除
const handleSelect = async (key: string, keyPath: string[]) => {
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
    // 登出时候
    if (key === 'logout') {
        const result = await userLogoutApi()
        const { code, message } = result
        if (code === '000000') {
            ElMessage({ message, type: 'success' })
            storeLoginState.logout()
        } else {
            ElMessage.error(message)
        }
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
                :ellipsis="false">
                <el-menu-item index="orders">{{ t(localeLanguage).header.orders }}</el-menu-item>
                <el-menu-item index="records">{{ t(localeLanguage).header.records }}</el-menu-item>
                <el-sub-menu index="language">
                    <template #title>{{ t(localeLanguage).header.language }}</template>
                    <el-menu-item index="zh">中文</el-menu-item>
                    <el-menu-item index="en">English</el-menu-item>
                </el-sub-menu>
                <el-menu-item index="login" v-if="!loginState">{{ t(localeLanguage).header.login }}</el-menu-item>
                <el-sub-menu index="profile" v-else>
                    <template #title>
                        <div class="profile">G</div>
                    </template>
                    <el-menu-item index="logout">{{ t(localeLanguage).header.logout }}</el-menu-item>
                </el-sub-menu>
            </el-menu>
        </div>
    </div>
</template>
<style scoped lang="scss">
@import "@/assets/scss/comTopNav/index.scss";
</style>