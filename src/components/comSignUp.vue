<script setup lang='ts'>
import { reactive } from 'vue'
// 引入语言控制
import { useLang } from '@/store/conLang'
import { storeToRefs } from 'pinia'
// 引入语言包
import { t } from '@/utils/internationalization'
const storeLang = useLang()
const { lang: langNow } = storeToRefs(storeLang)
// 收集用户信息
const user = reactive({
    account: '',
    password: ''
})
</script>
<template>
    <div class="content">
        <div class="content-main">
            <div class="account">
                <el-input type="text" :placeholder="t(langNow).login.placeMobile" v-model="user.account" :input-style="{
                        'text-indent': '1rem'
                    }"></el-input>
            </div>
            <div class="password">
                <el-input type="password" :placeholder="t(langNow).login.placePass" v-model="user.password" :input-style="{
                        'text-indent': '1rem'
                    }"></el-input>
            </div>
            <el-button class="login" round color="#ffc04d">{{ t(langNow).login.signBtn }}</el-button>
        </div>
    </div>
</template>
<style scoped lang='scss'>
@import "@/assets/scss/comLogin/index.scss"
</style>