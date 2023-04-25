<script setup lang='ts'>
/* global ElMessage */
import comTabs from '@/components/comTabs.vue'
import comLogin from '@/components/comLogin.vue'
import { ref } from 'vue'
import { t } from '@/utils/internationalization'
import { useLang } from '@/store/conLang'
import { storeToRefs } from 'pinia'
import { userSignApi, userLoginApi } from '@/api/login'
import { useRouter } from 'vue-router'
const router = useRouter()
const storeLang = useLang()
const { lang: langNow } = storeToRefs(storeLang)
// 控制当前状态
const typeNow = ref('login')
function typeChange(type: any) {
    typeNow.value = type
}
async function loginFun(value: any) {
    const result = await userLoginApi(value)
    // console.log(result, 'result---login')
    const { code, message } = result
    if (code === '000000') {
        ElMessage({ message, type: 'success' })
        router.push('/home')
    } else {
        ElMessage.error(message)
    }
}
async function signFun(value: any) {
    const result = await userSignApi(value)
    console.log(result, 'result---sign')
    const { code, message } = result
    if (code === '000000') {
        ElMessage({ message, type: 'success' })
        typeChange('login')
    } else {
        ElMessage.error(message)
    }
}
</script>
<template>
    <section class="loginContain">
        <div class="imgContain"></div>
        <div class="contentContain">
            <div class="main">
                <!-- 头部tab -->
                <comTabs @typeChange="typeChange" :selected-now="typeNow"></comTabs>
                <!-- 登录 -->
                <comLogin v-if="typeNow === 'login'" :btnValue="t(langNow).login.loginBtn" @success-fun="loginFun">
                </comLogin>
                <!-- 注册 -->
                <comLogin v-else :btnValue="t(langNow).login.signBtn" @success-fun="signFun"></comLogin>
            </div>
        </div>
    </section>
</template>
<style scoped lang="scss">
@import "@/assets/scss/login/index.scss"
</style>