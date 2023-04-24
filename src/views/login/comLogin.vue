<script setup lang='ts'>
import comTabs from '@/components/comTabs.vue'
import comLogin from '@/components/comLogin.vue'
import comSignUp from '@/components/comSignUp.vue'
import { ref } from 'vue'
// 控制当前状态
const typeNow = ref('login')
function typeChange(type: any) {
    typeNow.value = type
}
</script>
<template>
    <section class="loginContain">
        <div class="imgContain"></div>
        <div class="contentContain">
            <div class="main">
                <!-- 头部tab -->
                <comTabs @typeChange="typeChange"></comTabs>
                <!-- 登录 -->
                <comLogin v-if="typeNow === 'login'"></comLogin>
                <!-- 注册 -->
                <comSignUp v-else></comSignUp>
            </div>
        </div>
    </section>
</template>
<style scoped lang="scss">
@import "@/assets/scss/login/index.scss"
</style>