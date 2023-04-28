import { createApp } from './main'
import { renderToString } from 'vue/server-renderer'
// import { useHomeSwiper } from '@/store/homeSwiper'
// import { storeToRefs } from 'pinia'
// import { IRoomListParams } from '@/api/interface'

export async function render(url: string, manifest: any) {
    // console.log(typeof JSON.parse(manifest),'++++')
    const { app, router, storeHomeSwiper } = createApp()
    await router.push(url)
    await router.isReady()
    const matchedComponents = router.currentRoute.value.matched.flatMap((record: any) =>
        Object.values(record.components)
    )

    // console.log('匹配组件', matchedComponents)

    // 对所有匹配的路由组件调用 `asyncData()`
    // const storeHomeSwiper = useHomeSwiper()
    // const { pageNo, roomList } = storeToRefs(storeHomeSwiper)
    // await storeHomeSwiper.getRoomList({ pageNo: pageNo.value } as IRoomListParams)
    await Promise.all(matchedComponents.map((Component: any) => {
        if (Component.asyncData) {
            return Component.asyncData({
                storeHomeSwiper,
                route: router.currentRoute
            })
        }
    }))
    const context: any = {}
    const state = JSON.stringify(storeHomeSwiper.roomList)
    // console.log(store.state.value)
    const appHtml = await renderToString(app, context)
    if (import.meta.env.PROD) {
        const xxx = JSON.parse(manifest)
        const preloadLinks = renderLinks(context.modules, xxx)
        return { appHtml, state, preloadLinks }
    } else {
        // renderLinks(context.modules, xxx)
        return { appHtml, state }
    }
    function renderLinks(modules: any, manifest: any) {
        let links = ''
        let arr: Array<any> = []
        modules.forEach((id: any) => {
            const files = manifest[id]
            if (files) {
                files.forEach((file: any) => {
                    // links += renderPreloadLink(file)
                    arr.push(file)
                })
            }
        })
        // console.log(links)
        // console.log(arr)
        arr = fileSort(arr)
        arr.forEach(i => {
            links += renderPreloadLink(i)
        })
        return links
    }
    function renderPreloadLink(file: any) {
        if (file.endsWith('.js')) {
            return `<link rel="modulepreload" crossorigin href="${file}">`
        } else if (file.endsWith('.css')) {
            return `<link rel="stylesheet" href="${file}">`
        } else if (file.endsWith('.woff')) {
            return ` <link rel="preload" href="${file}" as="font" type="font/woff" crossorigin>`
        } else if (file.endsWith('.woff2')) {
            return ` <link rel="preload" href="${file}" as="font" type="font/woff2" crossorigin>`
        } else if (file.endsWith('.gif')) {
            return ` <link rel="preload" href="${file}" as="image" type="image/gif">`
        } else if (file.endsWith('.jpg') || file.endsWith('.jpeg')) {
            return ` <link rel="preload" href="${file}" as="image" type="image/jpeg">`
        } else if (file.endsWith('.png')) {
            return ` <link rel="preload" href="${file}" as="image" type="image/png">`
        } else {
            // TODO
            return ''
        }
    }
    function fileSort(arr: Array<any>) {
        const arrHasCss = arr.filter(i => i.endsWith('.css'))
        const arrNoCss = arr.filter(i => !i.endsWith('.css'))
        const arrNow = [...arrHasCss, ...arrNoCss]
        return arrNow
    }
}
