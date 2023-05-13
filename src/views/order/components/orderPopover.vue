<script setup lang="ts">
import { reactive, getCurrentInstance } from 'vue'
import { fetchOrderApi } from '@/api/order'
import { t } from '@/utils/internationalization'
import { useLang } from '@/store/conLang'
import { useLoginState } from '@/store/login'
import { useOrderVisable } from '@/store/orderVisable'
import { useHomeMsg } from '@/store/homeMsg'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

let orderData = reactive<Array<any>>([])
const router = useRouter()
const { proxy }: any = getCurrentInstance()
const storeLoginState = useLoginState()
const storeOrderVisable = useOrderVisable()
const storeHomeMsg = useHomeMsg()
const storeLang = useLang()
const { lang: langNow } = storeToRefs(storeLang)
const { loginState } = storeToRefs(storeLoginState)
// 房屋订单中心列表
function fetchOrder() {
  return fetchOrderApi().then((res) => {
    const { result, success, message } = res
    console.log(result)
    if (success) {
      console.log('成功')
      orderData = result
    } else {
      proxy.$message.error(message)
    }
  })
}
if (loginState) {
  await fetchOrder()
} else {
  proxy.$message.warning(t(langNow.value).login.loginLost)
  const { pathname } = window.location
  router.replace({
    name: 'login',
    query: {
      redirect: pathname
    }
  })
  closeMask()
}

// 关闭遮罩和popover
function closeMask() {
  storeOrderVisable.setOrderVisable(false)
}

function toDetail(item: any) {
  const { orderId: id } = item
  router.push({
    name: 'homeMsg',
    query: {
      id
    }
  })
  storeHomeMsg.setRoomId(id)
  storeHomeMsg.getRoomDetail({ id })
}
</script>

<template>
  <Teleport to="#app">
    <div class="mask" @click="closeMask"></div>
  </Teleport>
  <ul v-if="orderData.length > 0">
    <li v-for="(item, index) in orderData" :key="index" @click="toDetail(item)">
      <img :src="item.pictureUrl" />
      <div class="mess">
        <p class="title">{{ item.title }}</p>
        <p class="info">¥{{ item.price }}/{{ t(langNow).homeMsg.night }} · {{ item.personNumber }}{{
          t(langNow).homeMsg.person }}</p>
      </div>
    </li>
  </ul>
  <ul v-else class="loading-block">{{ t(langNow).common.empty }}</ul>
</template>

<style scoped lang="scss">
ul {
  @include placeholder-order;
}

li {
  @include flex-layout(row, space-between, center);
  border-bottom: 1px solid #eee;
  padding: 10px 0;

  &:last-child {
    border-bottom: none;
  }

  img {
    width: 65px;
    height: 45px;
    border-radius: 4px;
    margin-right: 5px;
    object-fit: cover;
  }

  .mess {
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-left: 10px;

    p {
      line-height: 16px;
      font-weight: normal;
      margin: 5px 0;
      max-width: 100px;
    }

    .title {
      font-weight: bold;
      color: #333;
      font-size: 14px;
      display: inline-block;
      @include line-text-overflow;
    }

    .info {
      color: #666;
      font-size: 12px;
    }
  }
}
</style>
