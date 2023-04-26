import { createApp } from './main'
import { renderToString } from 'vue/server-renderer'
export async function render(url: string) {
    const { app, router } = createApp()
    // const urlName = url.slice(1)
    await router.push(url)
    await router.isReady()
    const appHtml = renderToString(app)
    return appHtml
}