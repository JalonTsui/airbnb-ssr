import { createSSRApp } from 'vue'
import App from './App.vue'
import { createSSRRouter } from '@/router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import i18n from '@/language/i18n'
import { createPinia } from 'pinia'
// 需要预取的数据库数据
import { useHomeSwiper } from '@/store/homeSwiper'


export function createApp() {
    const app = createSSRApp(App)
    const router = createSSRRouter()
    const store = createPinia()
    app.use(ElementPlus as any)
    app.use(store)
    const storeHomeSwiper = useHomeSwiper()

    // app.use(i18n)
    app.use(router)
    return { app, router, storeHomeSwiper }
}