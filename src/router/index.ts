import { createRouter, createWebHistory } from 'vue-router'
import comLayout from '@/views/layout/comLayout.vue'
const routes = [
    {
        path: '/',
        name: 'layout',
        redirect: 'home',
        component: comLayout,
        children: [
            {
                path: 'home',
                component: () => import('@/views/home/viewHome.vue'),
                name: 'home',
                meta: {
                    name: 'home',
                    keepAlive: false
                }
            },
            {
                path: 'login',
                component: () => import('@/views/login/comLogin.vue'),
                name: 'login',
                meta: {
                    name: 'login',
                    keepAlive: false
                }
            },
            {
                path: 'demo',
                name: 'demo',
                component: () => import('@/views/demo/viewDemo.vue'),
                meta: {
                    name: 'demo',
                    keepAlive: false
                }
            }
        ]
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router