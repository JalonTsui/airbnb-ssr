import zh from '@/language/zh'
import en from '@/language/en'
// const locale: string = window.navigator.language
const locale = 'zh-cn'
const language: any = {
    'zh': 'zh',
    'zh-CN': 'zh', // key为'zh-CN'表示浏览器端语言环境
    'zh-cn': 'zh', // key为'zh-cn'表示element-plus组件语言包中的语言环境name
    'en': 'en' // key为'en'表示浏览器端或者element-plus语言包中的语言环境name
}
// 语言包自定义字段维护
const messages: any = {
    zh,
    en
}
// 封装一个自定义t函数，接收一个使用Provide/Inject传递的语言环境localeLanguage
export function t(localeLanguage: string) {
    // 返回一个中文或者英文的语言包对象，包含一些自定义字段
    return messages[language[localeLanguage || locale]]
}