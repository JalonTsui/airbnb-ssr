import { createApp } from './main'
import airbnb from '@/db'
const { app, router, storeHomeSwiper, storeHomeMsg } = createApp()

// 初始化仓库
router.beforeEach((to, from, next) => {
    airbnb.airbnbDB.openStore({
        ...airbnb.languageObjectStore,
        ...airbnb.userObjectStore,
        ...airbnb.orderObjectStore,
        ...airbnb.recordObjectStore
    }).then((res: any) => {
        // console.log('初始化所有对象仓库', res)
        next()
    })
})
// 获取预取的数据
const win: any = window
if (win.__INITIAL_STATE__) {
    storeHomeSwiper.setRoomList(win.__INITIAL_STATE__)
}
if (win.__INITIAL_HOMEMSG__) {
    storeHomeMsg.setRoomId(parseInt(win.__INITIAL_HOMEMSG__) || null)
}
// 防止数据的二次窃取，并且实现客户端的数据初始化
router.beforeResolve((to, from, next) => {
    const toComponents = router.resolve(to).matched.flatMap((item: any) => {
        return Object.values(item.components)
    })
    const fromComponents = router.resolve(from).matched.flatMap((item: any) => {
        return Object.values(item.components)
    })
    const actived = toComponents.filter((item, index) => {
        return fromComponents[index] !== item
    })
    // 加载页面需要用到的组件
    // console.log(actived)
    if (!actived.length) {
        return next()
    }
    // console.log('加载前')
    Promise.all(actived.map((Component: any) => {
        if (Component.asyncData) {
            return Component.asyncData({
                storeHomeSwiper,
                storeHomeMsg,
                route: router.currentRoute
            })
        }
    })).then(() => {
        // console.log('加载完毕')
        next()
    })
})
// 路由准备完毕后挂载应用
router.isReady().then(() => {
    app.mount('#app')
})
