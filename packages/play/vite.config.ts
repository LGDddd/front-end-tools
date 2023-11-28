import { URL, fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import inspect from 'vite-plugin-inspect'
import ElementPlus from 'unplugin-element-plus/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { MyComponentsResolver } from '@lgd_org/resolver'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueJsx(),
        AutoImport({
            imports: [
                'vue',
                'vue-router',
                'pinia',
            ],
            dts: './auto-imports.d.ts',
            eslintrc: {
                enabled: false,
                filepath: '../../.eslintrc-auto-import.json',
                globalsPropValue: true,
            },
            resolvers: [
                ElementPlusResolver(),
            ],
        }),
        Components({
            dts: './components.d.ts',
            resolvers: [
                ElementPlusResolver(),
                MyComponentsResolver(),
            ],
        }),
        ElementPlus({
            useSource: true,
        }),
        inspect(),
    ],
    server: {
        port: 9000,
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },

})
