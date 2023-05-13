import { createApp } from './main'
import { renderToString } from 'vue/server-renderer'

export async function render(url: string, manifest: any) {
    const { app, router, storeHomeSwiper, storeHomeMsg } = createApp()
    await router.push(url)
    await router.isReady()
    // console.log(router.getRoutes())
    const matchedComponents = router.currentRoute.value.matched.flatMap((record: any) =>
        Object.values(record.components)
    )

    // console.log('匹配组件', matchedComponents)

    // 对所有匹配的路由组件调用 `asyncData()`
    await Promise.all(matchedComponents.map((Component: any) => {
        if (Component.asyncData) {
            return Component.asyncData({
                storeHomeSwiper,
                storeHomeMsg,
                route: router.currentRoute
            })
        }
    }))
    // 全局上下文
    const context: any = {}
    // 预获取主页数据
    const state = JSON.stringify(storeHomeSwiper.roomList)
    // 预获取房屋详情页数据
    const homeMsg = JSON.stringify(storeHomeMsg.roomId)
    const appHtml = await renderToString(app, context)
    // 判断是否为生产环境
    if (import.meta.env.PROD) {
        // 获取全部要加载的资源，需要在打包静态资源加入manifest字段
        const resourceList = JSON.parse(manifest)
        // 生成不同资源对应的生成资源标签
        const preloadLinks = renderLinks(context.modules, resourceList)
        // 把需要用到的资源返回到服务端，实现服务端渲染
        return { appHtml, state, preloadLinks, homeMsg }
    } else {
        return { appHtml, state, homeMsg }
    }
    // 获取所有的资源并处理
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
    // 加工不同的资源，加入引入标签
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
    // 排序资源，把css放在前面先加载，防止css闪烁
    function fileSort(arr: Array<any>) {
        const arrHasCss = arr.filter(i => i.endsWith('.css'))
        const arrNoCss = arr.filter(i => !i.endsWith('.css'))
        const arrNow = [...arrHasCss, ...arrNoCss]
        return arrNow
    }
}
