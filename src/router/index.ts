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
                            keepAlive: false
                        }
                    },
                    {
                        path: 'homeMsg',
                        component: () => import('@/views/home/homeMsg/homeMsg.vue'),
                        name: 'homeMsg',
                        meta: {
                            name: 'homeMsg',
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