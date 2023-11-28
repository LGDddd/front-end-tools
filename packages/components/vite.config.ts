import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dts from 'vite-plugin-dts'
import ElementPlus from 'unplugin-element-plus/vite'

export default defineConfig({
    plugins: [
        vue(),
        vueJsx(),
        ElementPlus({
            useSource: true,
        }),
        dts({
            outDir: ['types'],
            staticImport: true,
            rollupTypes: true,
        }),
    ],
    build: {
        rollupOptions: {
            external: ['vue', 'element-plus', '@element-plus/icons-vue', /\.scss/],
            output: [
                {
                    format: 'cjs',
                    entryFileNames: '[name].cjs',
                    preserveModules: true,
                    dir: 'lib',
                    preserveModulesRoot: 'src',
                    exports: 'named',
                },
                {
                    format: 'es',
                    entryFileNames: '[name].mjs',
                    preserveModules: true,
                    dir: 'es',
                    preserveModulesRoot: 'src',
                },
                {
                    format: 'umd',
                    exports: 'named',
                    name: 'LgdComponents',
                    entryFileNames: '[name].js',
                    dir: 'umd',
                    preserveModulesRoot: 'src',
                    globals: {
                        'vue': 'Vue',
                        'element-plus': 'ElementPlus',
                        '@element-plus/icons-vue': 'ElementPlusIconsVue',
                    },
                },
            ],
        },
        lib: {
            entry: './src/index.ts',
        },
    },
})
