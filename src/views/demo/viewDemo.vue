<script setup lang='ts'>
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import commonChild from './commonChild.vue'
const router = useRouter()
const { t } = useI18n()
function toHome() {
    router.push('/home')
}
</script>

<template>
    <div>{{ t('message.home') }}</div>
    <div>{{ t('message.mine') }}</div>
    <div>demo</div>
    <el-button @click="toHome">toHome</el-button>
    <commonChild></commonChild>
</template>
<style scoped></style>
