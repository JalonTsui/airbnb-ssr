<script setup lang='ts'>
import { inject } from 'vue'
import { t } from '@/utils/internationalization'
// 确定当前语言环境
const localeLanguage: string = inject('localeLanguage') || ''
</script>
<template>
    <footer class="contain">
        <section>
            <div class="content-item">
                <div class="title">{{ t(localeLanguage).footer.airbnb }}</div>
                <a href="#" target="_blank" class="content">{{ t(localeLanguage).footer.careers }}</a>
                <a href="#" target="_blank" class="content">{{ t(localeLanguage).footer.news }}</a>
                <a href="#" target="_blank" class="content">{{ t(localeLanguage).footer.topic }}</a>
                <a href="#" target="_blank" class="content">{{ t(localeLanguage).footer.diversity }}</a>
                <a href="#" target="_blank" class="content">{{ t(localeLanguage).footer.accessibility }}</a>
            </div>
            <div class="content-item">
                <div class="title">{{ t(localeLanguage).footer.discovery }}</div>
                <a href="#" target="_blank" class="content">{{ t(localeLanguage).footer.trustAndSafe }}</a>
                <a href="#" target="_blank" class="content">{{ t(localeLanguage).footer.invite }}</a>
                <a href="#" target="_blank" class="content">{{ t(localeLanguage).footer.evection }}</a>
                <a href="#" target="_blank" class="content">{{ t(localeLanguage).footer.magzine }}</a>
                <a href="#" target="_blank" class="content">{{ t(localeLanguage).footer.airbnborg }}</a>
            </div>
            <div class="content-item">
                <div class="title">{{ t(localeLanguage).footer.rent }}</div>
                <a href="#" target="_blank" class="content">{{ t(localeLanguage).footer.whyRent }}</a>
                <a href="#" target="_blank" class="content">{{ t(localeLanguage).footer.hospitality }}</a>
                <a href="#" target="_blank" class="content">{{ t(localeLanguage).footer.responsibleHosting }}</a>
                <a href="#" target="_blank" class="content">{{ t(localeLanguage).footer.experiences }}</a>
                <a href="#" target="_blank" class="content">{{ t(localeLanguage).footer.resources }}</a>
            </div>
            <div class="content-item">
                <div class="title">{{ t(localeLanguage).footer.service }}</div>
                <a href="#" target="_blank" class="content">{{ t(localeLanguage).footer.help }}</a>
                <a href="#" target="_blank" class="content">{{ t(localeLanguage).footer.neighbors }}</a>
            </div>
        </section>
        <article>
            @ 2022 Harry, Inc . All rights reserved.
        </article>
    </footer>
</template>
<style scoped lang="scss">
@import "@/assets/scss/comBottom/index.scss"
</style>