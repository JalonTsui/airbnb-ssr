import { createApp } from './main'
import airbnb from '@/db'
const { app, router, storeHomeSwiper } = createApp()

router.beforeEach((to, from, next) => {
    // console.log('to','---------',to)
    // console.log('from','---------',from)
    airbnb.airbnbDB.openStore({
        ...airbnb.languageObjectStore,
        ...airbnb.userObjectStore
    }).then((res: any) => {
        console.log('初始化所有对象仓库', res)
        next()
    })
})
const win: any = window
if (win.__INITIAL_STATE__) {
    // console.log(window.__INITIAL_STATE__)
    storeHomeSwiper.setRoomList(win.__INITIAL_STATE__)
    // console.log(window.__INITIAL_STATE__)
}
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
    console.log(actived)
    if (!actived.length) {
        return next()
    }
    console.log('加载前')
    Promise.all(actived.map((Component: any) => {
        if (Component.asyncData) {
            return Component.asyncData({
                storeHomeSwiper,
                route: router.currentRoute
            })
        }
    })).then(() => {
        console.log('加载完毕')
        next()
    })
})
router.isReady().then(() => {
    app.mount('#app')
})
