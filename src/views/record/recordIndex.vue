<script setup lang='ts'>
import { fetchRecordApi } from '@/api/record'
import { useLoginState } from '@/store/login'
import { useLang } from '@/store/conLang'
import { useHomeMsg } from '@/store/homeMsg'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { t } from '@/utils/internationalization'
import { getCurrentInstance, ref, onMounted } from 'vue'

const recordData = ref()
const { proxy }: any = getCurrentInstance()
const storeHomeMsg = useHomeMsg()
const storeLoginState = useLoginState()
const storeLang = useLang()
const { loginState } = storeToRefs(storeLoginState)
const { lang: langNow } = storeToRefs(storeLang)
const router = useRouter()
const loading = ref(true)

function fetchRecord() {
  fetchRecordApi().then(res => {
    const { success, message, result } = res
    loading.value = false
    if (success) {
      console.log('历史足迹数据', res)
      recordData.value = result
    } else {
      proxy.$message.error(message)
    }
  })
}

onMounted(() => {
  if (loginState) {
    fetchRecord()
  } else {
    proxy.$message.warning(t(langNow.value).login.loginLost)
    const { pathname } = window.location
    router.replace({
      name: 'login',
      query: {
        redirect: pathname
      }
    })
  }
})

function toDetail(item: any) {
  const { recordId: id } = item
  router.push({
    name: "homeMsg",
    query: {
      id
    }
  })
  storeHomeMsg.setRoomId(id)
  storeHomeMsg.getRoomDetail({ id })
}
</script>

<template>
  <div class="record-page">
    <div class="main-wrapper">
      <el-skeleton :loading="loading" animated>
        <template #template>
          <div class="column-style">
            <div class="item" v-for="i in 9" :key="i">
              <el-skeleton-item variant="image" style="width:315px;height:240px;border-radius:4px;"></el-skeleton-item>
              <el-skeleton-item variant="p" style="width:100%;margin-top:15px;"></el-skeleton-item>
              <el-skeleton-item variant="p" style="width:30%"></el-skeleton-item>
            </div>
          </div>
        </template>
        <template #default>
          <div class="column-style" v-if="recordData.length > 0">
            <div class="item" v-for="(item, index) in recordData" :key="index" @click="toDetail(item)">
              <el-image :src="item.pictureUrl" :alt="item.title"></el-image>
              <p class="title">{{ item.title }}</p>
              <p class="price">¥{{ item.price }}</p>
            </div>
          </div>
          <el-empty v-else description="暂无浏览记录哦~"></el-empty>
        </template>
      </el-skeleton>

    </div>
  </div>
</template>

<style  lang='scss'>
.record-page {
  .main-wrapper {
    @include main-wapper(30px);

    .column-style {
      column-count: 3;

      .item {
        width: 315px;
        overflow: hidden;
        margin-bottom: 25px;
        cursor: pointer;
        text-align: left;
        display: inline-block;

        img {
          width: 315px;
          height: auto;
          border-radius: 4px;
        }

        .title {
          width: 315px;
          font-size: 18px;
          margin: 15px 0px;
          font-weight: bold;
        }

        .price {
          font-size: 16px;
        }
      }
    }
  }
}
</style>
