import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 配置@别名
import { resolve } from "path";
// vite.config.ts
// import AutoImport from 'unplugin-auto-import/vite'
// import Components from 'unplugin-vue-components/vite'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  //   AutoImport({
  //     imports: ['vue', 'vue-router'],
  //     dts: "src/auto-import.d.ts",
  //     resolvers: [ElementPlusResolver()],
  //   }),
  //   Components({
  //     resolvers: [ElementPlusResolver()],
  //   }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        // 引入全局的scss
        additionalData: `@import '@/assets/scss/index.scss';`,
      }
    },
  },
  // ↓解析配置
  resolve: {
    // ↓路径别名
    alias: {
      "@": resolve(__dirname, "./src")
    }
  },
  // server: {
  //   host: 'localhost',
  //     port: 3000,
  //       proxy: {
  //         '/release': {
  //           target: 'https://service-ase3oocp-1302839645.sh.apigw.tencentcs.com',
  //           changeOrigin: true,
  //           rewrite: path => path.replace(/^\/release/, '')
  //         }
  //       }
  // }  
})




