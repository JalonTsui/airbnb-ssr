import { createSSRApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import i18n from '@/language/i18n'
import { createPinia } from 'pinia'

const store = createPinia()


export function createApp() {
    const app = createSSRApp(App)
    app.use(ElementPlus as any)
    app.use(store)
    app.use(i18n)
    app.use(router)
    return { app, router }
}