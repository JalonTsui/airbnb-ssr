<script setup lang='ts'>
import { ref, onMounted, defineEmits } from 'vue'
const emits = defineEmits(['typeChange'])
// 获取tab中的第一个节点（用于初始显示）
const firstDom: any = ref(null)
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
</script>
<template>
    <div>
        <div class="tap-top" :style="{ '--width': widthT, '--left': leftT }" @click="tapScroll">
            <div ref="firstDom" :style="{ 'color': selected === 'login' ? 'orange' : 'black' }" data-index="login">
                登录
            </div>
            <div :style="{ 'color': selected === 'signUp' ? 'orange' : 'black' }" data-index="signUp">注册</div>
        </div>
        <div class="tap-content"></div>
    </div>
</template>
<style scoped lang='scss'>
@import "@/assets/scss/comTab/index.scss";
</style>