<script setup lang='ts'>
// 用于忽视Elmessage报错,已经在全局声明
// /* global ElMessage */
// 头部组件
import comTopNav from '@/components/comTopNav.vue'
// 底部组件
import comBottom from '@/components/comBottom.vue'
// import { fetchDemo, fetchElephant } from '@/api'
// import { useRouter } from 'vue-router'
// 国际化配置
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'
import { ref, provide } from 'vue'
// 改变全局的语言变化
import { useLang } from '@/store/conLang'
import { storeToRefs } from 'pinia'

const storeLang = useLang()
const { lang: langNow } = storeToRefs(storeLang)
// 控制当前的语言环境（element-plus相关的）
const locale = ref(zhCn)
// 记录当前的语言是什么（自己的语言包）
const localeLanguage = ref('')
// 默认语言环境
if (langNow.value === 'zh-cn') {
  localeLanguage.value = zhCn.name
} else {
  locale.value = en
  localeLanguage.value = "en"
}
// 改变语言的方法
function changeLanguage(lang: any) {
  locale.value = lang
  localeLanguage.value = lang.name
}
// 给组件的改变语言的方法
function onChangeLanguage(lang: string) {
  if (lang === "zh") {
    changeLanguage(zhCn)
    storeLang.changeLang('zh-cn')
  } else if (lang === "en") {
    changeLanguage(en)
    storeLang.changeLang(lang)
  }
}
// 把当前的语言环境给后面的组件
provide('localeLanguage', localeLanguage)
</script>
<template>
  <!-- 头部组件 -->
  <comTopNav @onChangeLanguage="onChangeLanguage"></comTopNav>
  <!-- 内容 -->
  <!-- 底部 -->
  <comBottom></comBottom>
</template>

<style scoped lang="scss">
@import "@/assets/scss/home/index.scss";
</style>
