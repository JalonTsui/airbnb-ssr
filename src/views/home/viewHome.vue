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

// 控制当前的语言环境（element-plus相关的）
const locale = ref(zhCn)
// 记录当前的语言是什么（自己的语言包）
const localeLanguage = ref('')
// 改变语言的方法
function changeLanguage(lang: any) {
  locale.value = lang
  localeLanguage.value = lang.name
}
// 给组件的改变语言的方法
function onChangeLanguage(lang: string) {
  if (lang === "zh") {
    changeLanguage(zhCn)
  } else if (lang === "en") {
    changeLanguage(en)
  }
}
// 把当前的语言环境给后面的组件
provide('localeLanguage', localeLanguage)
// 引入路由
// const router = useRouter()
// 测试ElMessage的使用
// async function fn1() {
//   ElMessage('nihaoa')
//   const result = await fetchDemo()
//   console.log(result)
// }
// 测试路由跳转
// function toDemo() {
//   router.push('/demo')
// }
// 测试element-plus组件语言变化
// const value1 = ref('')

// home.vue
// 测试Mock接口
// function getElephant() {
//   fetchElephant().then(res => {
//     console.log('Mock接口', res)
//   })
// }

</script>
<template>
  <!-- 头部组件 -->
  <comTopNav @onChangeLanguage="onChangeLanguage"></comTopNav>
  <!-- 内容 -->
  <!-- <el-config-provider :locale="locale">
    <div>nihao</div>
    <div class="demo-date-picker">
      <div class="block">
        <span class="demonstration">Default</span>
        <el-date-picker v-model="value1" type="date" placeholder="Pick a day" size="small" />
      </div>
    </div>
  </el-config-provider>
  <div class="name">home
    <div>123</div>
    <div>321</div>
  </div>
  <el-button @click="fn1"></el-button>
  <el-button @click="toDemo">toDemo</el-button>
  <el-button @click="getElephant">request</el-button> -->
  <!-- 底部 -->
  <comBottom></comBottom>
</template>

<style scoped lang="scss">
@import "@/assets/scss/home/index.scss";
</style>
