<script setup lang='ts'>
import { ref, onMounted, defineEmits, watch } from 'vue'
// 引入语言包
import { t } from '@/utils/internationalization'
// 引入当前语言环境
import { useLang } from '@/store/conLang'
import { storeToRefs } from 'pinia'
const props = defineProps(['selectedNow'])
const storeLang = useLang()
const { lang: langNow } = storeToRefs(storeLang)
// 促发转换事件，给父级
const emits = defineEmits(['typeChange'])
// 获取tab中的第一个节点（用于初始显示）
const firstDom: any = ref(null)
const secondDom: any = ref(null)
// 映射选择节点
const domNow = {
    'login': firstDom,
    'signUp': secondDom
}
// 用于控制登录下面的选择线
const leftT = ref('')
// 用于控制登录下面的选择线
const widthT = ref('')
// 记录当前选择的tab框
const selected: any = ref('login')
onMounted(() => {
    const left = firstDom.value.offsetLeft
    const width = firstDom.value.offsetWidth
    leftT.value = left + 'px'
    widthT.value = width + 'px'
})
// 根据点击改变tabs状态
function tapScroll(e: any) {
    const type = e.target.attributes['data-index'] && e.target.attributes['data-index'].value
    if (!type) return
    const left = e.target.offsetLeft
    const width = e.target.offsetWidth
    selected.value = type
    leftT.value = left + 'px'
    widthT.value = width + 'px'
    emits('typeChange', type)
}
// 根据父组件传入的tabs改变状态
watch(() => props.selectedNow, (newValue: ('login' | 'signUp')) => {
    const left = domNow[newValue].value.offsetLeft
    const width = domNow[newValue].value.offsetWidth
    selected.value = newValue
    leftT.value = left + 'px'
    widthT.value = width + 'px'
})
</script>
<template>
    <div>
        <div class="tap-top" :style="{ '--width': widthT, '--left': leftT }" @click="tapScroll">
            <div ref="firstDom" :style="{ 'color': selected === 'login' ? 'orange' : 'black' }" data-index="login">
                {{ t(langNow).login.loginTab }}
            </div>
            <div ref="secondDom" :style="{ 'color': selected === 'signUp' ? 'orange' : 'black' }" data-index="signUp">
                {{ t(langNow).login.signTab }}</div>
        </div>
        <div class="tap-content"></div>
    </div>
</template>
<style scoped lang='scss'>
@import "@/assets/scss/comTab/index.scss";
</style>