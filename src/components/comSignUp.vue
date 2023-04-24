<script setup lang='ts'>
import { reactive } from 'vue'
const user = reactive({
    account: '',
    password: ''
})
</script>
<template>
    <div class="content">
        <div class="content-main">
            <div class="account">
                <el-input type="text" placeholder="请输入账号" v-model="user.account" :input-style="{
                        'text-indent': '1rem'
                    }"></el-input>
            </div>
            <div class="password">
                <el-input type="password" placeholder="请输入密码" v-model="user.password" :input-style="{
                        'text-indent': '1rem'
                    }"></el-input>
            </div>
            <el-button class="login" round color="#ffc04d">立即注册</el-button>
        </div>
    </div>
</template>
<style scoped lang='scss'>
@import "@/assets/scss/comLogin/index.scss"
</style>