import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import i18n from '@/language/i18n'
import { createPinia } from 'pinia'
import airbnb from '@/db'

const store = createPinia()
const app = createApp(App)

app.use(ElementPlus as any)
app.use(store)
app.use(i18n)
app.use(router)
router.beforeEach((to, from, next) => {
    airbnb.airbnbDB.openStore({
        ...airbnb.languageObjectStore,
        ...airbnb.userObjectStore
    }).then((res: any) => {
        console.log('初始化所有对象仓库', res)
        next()
    })
})
app.mount('#app')
