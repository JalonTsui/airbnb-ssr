import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router'
import comLayout from '@/views/layout/comLayout.vue'
const routes = [
    {
        path: '/',
        name: 'layout',
        redirect: 'home/main',
        component: comLayout,
        children: [
            {
                path: 'home',
                component: () => import('@/views/home/viewHome.vue'),
                name: 'home',
                meta: {
                    name: 'home',
                    keepAlive: false
                },
                children: [
                    {
                        path: 'main',
                        component: () => import('@/views/home/components/mainContent.vue'),
                        name: 'main',
                        meta: {
                            name: 'main',
                            keepAlive: false,
                            title: '爱此迎-全球大型房屋租赁平台',
                            keywords: '爱此迎，特价房源，品质房源，租赁平台',
                            description: '爱此迎（Aircnb）是房屋租赁平台。爱此迎（Aircnb）的房屋涉及上海、北京、杭州、苏州等60个城市，覆盖了特价房源、品质房源，帮助用户实现从线上房屋预定和浏览功能。 ',
                        }
                    },
                    {
                        path: 'homeMsg',
                        component: () => import('@/views/home/homeMsg/homeMsg.vue'),
                        name: 'homeMsg',
                        meta: {
                            name: 'homeMsg',
                            keepAlive: false,
                            title:'爱此迎-'
                        }
                    },
                    {
                        path: 'record',
                        component: () => import('@/views/record/recordIndex.vue'),
                        name: 'record',
                        meta: {
                            name: 'record',
                            keepAlive: false
                        }
                    }
                ]
            },
            {
                path: 'login',
                component: () => import('@/views/login/comLogin.vue'),
                name: 'login',
                meta: {
                    name: 'login',
                    keepAlive: false
                }
            }
        ]
    },
]


// const router = createRouter({
//     history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
//     routes
// })
// export default router
export function createSSRRouter() {
    return createRouter({
        history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
        routes
    })
}