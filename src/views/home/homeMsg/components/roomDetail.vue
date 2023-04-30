<script setup lang="ts">
import { reactive } from 'vue'
import { useHomeMsg } from '@/store/homeMsg'
import { storeToRefs } from 'pinia'
import { t } from '@/utils/internationalization'
import { useLang } from '@/store/conLang'

// 组件房屋信息
const storeHomeMsg = useHomeMsg()
const { roomDetail } = storeToRefs(storeHomeMsg)
// 当前语言环境
const storeLang = useLang()
const { lang: langNow } = storeToRefs(storeLang)
const orderForm = reactive({
    personNumber: 1
})
function submitForm() {
    console.log('支付逻辑-----roomDetail')
}
</script>

<template>
    <div v-if="roomDetail && roomDetail.info && roomDetail.owner">
        <!-- 照片墙 -->
        <el-carousel v-if="roomDetail.imgs && roomDetail.imgs.length > 0" class="imgs-wall" trigger="click" height="380px"
            :interval="3000" indicator-position="none" type="card">
            <el-carousel-item v-for="(item, index) in roomDetail.imgs" :key="index">
                <img :src="item">
            </el-carousel-item>
        </el-carousel>

        <div class="main-wapper">
            <!-- 房屋详情信息 -->
            <div class="room-detail">
                <div class="detail-part">
                    <h2>{{ roomDetail.title }}</h2>
                    <!-- 房屋信息 -->
                    <div class="info">
                        <span class="room">{{ roomDetail.info.room }} {{ t(langNow).homeMsg.rooms }}</span>
                        <span class="bed">{{ roomDetail.info.bed }} {{ t(langNow).homeMsg.beds }}</span>
                        <span class="toilet">{{ roomDetail.info.toilet }} {{ t(langNow).homeMsg.bathrooms }}</span>
                        <span class="live-number">{{ t(langNow).homeMsg.living }} {{ roomDetail.info.liveNumber }} {{
                            t(langNow).homeMsg.personNumber }}</span>
                    </div>
                    <div class="tags">
                        <el-tag size="small">{{ roomDetail.info.remarks }} {{ t(langNow).homeMsg.remarks }}</el-tag>
                        <el-tag size="small" class="ml-10" type="danger" v-if="roomDetail.info.metro">{{
                            t(langNow).homeMsg.nearSubway }}</el-tag>
                        <el-tag size="small" class="ml-10" type="warning" v-if="roomDetail.info.parking">{{
                            t(langNow).homeMsg.freeParking }}</el-tag>
                        <el-tag size="small" class="ml-10" type="success" v-if="roomDetail.info.luggage">{{
                            t(langNow).homeMsg.luggage }}</el-tag>
                    </div>
                    <hr />
                    <!-- 房东信息 -->
                    <div class="owner-detail">
                        <img :src="roomDetail.owner.avatar">
                        <div class="info">
                            <p>{{ t(langNow).homeMsg.landlord }}：{{ roomDetail.owner.name }}</p>
                            <p>
                                <span v-if="roomDetail.owner.certify">{{ t(langNow).homeMsg.authenticated }}</span>
                                <span v-if="roomDetail.info.goodOwner">{{ t(langNow).homeMsg.greatlandlord }}</span>
                            </p>
                        </div>
                    </div>
                    <!-- 基本介绍 -->
                    <div class="introduce">{{ roomDetail.owner.introduce }}</div>
                </div>
                <div class="form-part">
                    <p class="price">
                        <span>¥{{ roomDetail.price }}</span> / {{ t(langNow).homeMsg.night }}
                    </p>
                    <!-- 表单 -->
                    <el-form ref="orderForm" :model="orderForm" label-position="top" class="order-ruleForm">
                        <el-form-item prop="personNumber" :label="t(langNow).homeMsg.personNumber">
                            <select v-model="orderForm.personNumber">
                                <option v-for="item in 3" :value="item" :key="item">{{ item }}</option>
                            </select>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="btn-primary" type="primary" @click="submitForm">{{ t(langNow).homeMsg.order
                            }}</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang='scss'></style>
