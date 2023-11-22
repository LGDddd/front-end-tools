import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import gulp from 'gulp'
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass'
import autoprefixer from 'gulp-autoprefixer'
import shell from 'shelljs'

const componentPath = resolve(dirname(fileURLToPath(import.meta.url)), '../')

const { src, dest } = gulp
const sass = gulpSass(dartSass)

// 删除打包产物
export async function removeDist() {
    shell.rm('-rf', `${componentPath}/lib`)
    shell.rm('-rf', `${componentPath}/es`)
    shell.rm('-rf', `${componentPath}/types`)
}

// 构建所有的css在一个文件中
export function buildRootStyle() {
    return src(`${componentPath}/src/index.scss`)
        .pipe(sass())
        .pipe(
            autoprefixer(),
        )
        .pipe(dest(`${componentPath}/es`))
        .pipe(dest(`${componentPath}/lib`))
}

// 构建每个组件下单独的css
export function buildStyle() {
    return src(`${componentPath}/src/**/style/*.scss`)
        .pipe(sass())
        .pipe(
            autoprefixer(),
        )
        .pipe(dest(`${componentPath}/es`))
        .pipe(dest(`${componentPath}/lib`))
}

// 打包组件
export async function buildComponent() {
    shell.cd(componentPath)
    shell.exec('vite build')
}
