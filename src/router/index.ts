import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router'
import comLayout from '@/views/layout/comLayout.vue'
// import viewHome from '@/views/home/viewHome.vue'
// import comLogin from '@/views/login/comLogin.vue'
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
                // component: viewHome,
                name: 'home',
                meta: {
                    name: 'home',
                    keepAlive: false
                }
            },
            {
                path: 'login',
                component: () => import('@/views/login/comLogin.vue'),
                // component: comLogin,
                name: 'login',
                meta: {
                    name: 'login',
                    keepAlive: false
                }
            }
        ]
    },
]
const routesCopy = [
    {
        path: '/home',
        component: () => import('@/views/home/viewHome.vue'),
        // component: viewHome,
        name: 'home',
        meta: {
            name: 'home',
            keepAlive: false
        }
    },
    {
        path: '/login',
        component: () => import('@/views/login/comLogin.vue'),
        // component: comLogin,
        name: 'login',
        meta: {
            name: 'login',
            keepAlive: false
        }
    }
]


const router = createRouter({
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes
})
export default router