import { createSSRApp } from 'vue'
import App from './App.vue'
import { createSSRRouter } from '@/router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
// 需要预取的数据库数据
import { useHomeSwiper } from '@/store/homeSwiper'
import { useHomeMsg } from '@/store/homeMsg'


export function createApp() {
    const app = createSSRApp(App)
    const router = createSSRRouter()
    const store = createPinia()
    app.use(ElementPlus as any)
    app.use(store)
    // 需要用到的仓库数据
    const storeHomeSwiper = useHomeSwiper()
    const storeHomeMsg = useHomeMsg()
    app.use(router)
    return { app, router, storeHomeSwiper, storeHomeMsg }
}