<script setup lang='ts'>
import { reactive, ref } from 'vue'
// 引入语言控制
import { useLang } from '@/store/conLang'
import { storeToRefs } from 'pinia'
// 引入语言包
import { t } from '@/utils/internationalization'
// test
// console.log('comLogin', import.meta)
const props = defineProps({
    btnValue: {
        required: true
    }
})
const emits = defineEmits(['successFun'])
const ruleFormRef = ref(null)
const storeLang = useLang()
const { lang: langNow } = storeToRefs(storeLang)
// 收集用户信息
const user = reactive({
    mobile: '',
    password: ''
})
// 表单验证规则
const rules = reactive({
    mobile: [
        { required: true, message: '账号必须填写', trigger: 'blur' },
        { min: 11, max: 11, message: '长度必须为11', trigger: 'blur' },
        // 自定义一个手机数字规则
        { validator: validNumber, trigger: 'blur' }
    ],
    password: [
        { required: true, message: '密码必须填写', trigger: 'blur' },
        { max: 13, message: '密码最多13位', trigger: 'blur' }
    ]
})
// 提交验证
const submitForm = async (formEl: any) => {
    if (!formEl) return
    await formEl.validate((valid: any, fields: any) => {
        if (valid) {
            console.log('submit!')
            emits('successFun', user)
        } else {
            console.log('error submit!', fields)
        }
    })
}
// 手机号验证
function validNumber(_rule: any, value: any, callback: any) {
    if (!value) {
        return callback(new Error('账号必须填写'))
    }
    const exg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
    if (!exg.test(value)) {
        return callback(new Error('请输入正确手机号'))
    }
    // 一定要写回一个callback()表示成功
    return callback()
}

</script>
<template>
    <div class="content">
        <div class="content-main">
            <el-form ref="ruleFormRef" :model="user" :rules="rules" class="demo-ruleForm">
                <div class="account">
                    <el-form-item prop="mobile">
                        <el-input type="text" :placeholder="t(langNow).login.placeMobile" v-model="user.mobile"
                            :input-style="{
                                    'text-indent': '1rem'
                                }"></el-input>
                    </el-form-item>
                </div>
                <div class="password">
                    <el-form-item prop="password">
                        <el-input type="password" :placeholder="t(langNow).login.placePass" v-model="user.password"
                            :input-style="{
                                    'text-indent': '1rem'
                                }"></el-input>
                    </el-form-item>
                </div>
                <el-button class="login" round color="#ffc04d" @click="submitForm(ruleFormRef)">{{ props.btnValue
                }}</el-button>
            </el-form>
        </div>
    </div>
</template>
<style scoped lang='scss'>
@import "@/assets/scss/comLogin/index.scss";
</style>