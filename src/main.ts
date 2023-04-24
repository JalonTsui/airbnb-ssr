import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import i18n from '@/language/i18n'

const app = createApp(App)
app.use(ElementPlus as any)
app.use(i18n)
app.use(router)
app.mount('#app')
