import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Buffer } from 'node:buffer'
import fs from 'node:fs'
import gulp from 'gulp'
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass'
import autoprefixer from 'gulp-autoprefixer'
import shell from 'shelljs'
import through2 from 'through2'
import rename from 'gulp-rename'

const componentPath = resolve(dirname(fileURLToPath(import.meta.url)), '../')

const { src, dest } = gulp
const sass = gulpSass(dartSass)

// 删除打包产物
export async function removeDist() {
    shell.rm('-rf', `${componentPath}/lib`)
    shell.rm('-rf', `${componentPath}/es`)
    shell.rm('-rf', `${componentPath}/types`)
    shell.rm('-rf', `${componentPath}/umd`)
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
        .pipe(dest(`${componentPath}/umd`))
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

// 构建es模块下每个组件style/index.js 主要是为了引入element-plus的样式
export function buildElementStyleWithEs() {
    return src(`${componentPath}/src/**/style/index.js`)
        .pipe(through2.obj((file, _, cb) => {
            if (file.isBuffer()) {
                const code = file.contents.toString()
                file.contents = Buffer.from(
                    `import './index.css'
${code}`,
                )
            }
            cb(null, file)
        }))
        .pipe(rename((path) => {
            path.basename = 'index'
            path.extname = '.mjs'
        }))
        .pipe(dest(`${componentPath}/es`))
}

// 构建lib模块下每个组件style/index.js 主要是为了引入element-plus的样式
export function buildElementStyleWithLib() {
    return src(`${componentPath}/src/**/style/index.js`)
        .pipe(through2.obj((file, _, cb) => {
            if (file.isBuffer()) {
                const code = file.contents.toString()
                const newCode = code
                    .replace(/import/g, '')
                    .replace(/;/g, '')
                    .replace(/\'/g, '')
                    .replace(/\"/g, '')
                    .split(' ')
                    .map(c => c.trim())
                    .filter(Boolean)
                    .map((c) => {
                        return `require('${c}')`
                    })
                    .join(`
`)
                file.contents = Buffer.from(
                    `require('./index.css')
${newCode}`,
                )
            }
            cb(null, file)
        }))
        .pipe(rename((path) => {
            path.basename = 'index'
            path.extname = '.cjs'
        }))
        .pipe(dest(`${componentPath}/lib`))
}

// 打包组件
export async function buildComponent() {
    shell.cd(componentPath)
    shell.exec('vite build')
}

// 检测文件，填补缺失的文件
export async function buildMissingStyle() {
    const dirs = fs.readdirSync(`${componentPath}/es`)
    dirs.forEach((item) => {
        const file1 = fs.statSync(`${componentPath}/es/${item}`)
        if (file1.isDirectory()) {
            fs.access(`${componentPath}/es/${item}/style`, (err) => {
                if (err) {
                    if (item.includes('my-')) { // TODO 用于检测是否是组件
                        fs.mkdirSync(`${componentPath}/es/${item}/style`)
                        fs.mkdirSync(`${componentPath}/es/${item}/style/index.css`, '', { encoding: 'utf-8' })
                        fs.writeFileSync(`${componentPath}/es/${item}/style/index.mjs`, 'import \'./index.css\'', { encoding: 'utf-8' })
                    }
                }
                else {
                    fs.access(`${componentPath}/es/${item}/style/index.css`, (err) => {
                        if (err) {
                            fs.writeFileSync(`${componentPath}/es/${item}/style/index.css`, '', { encoding: 'utf-8' })
                        }
                    })
                    fs.access(`${componentPath}/es/${item}/style/index.mjs`, (err) => {
                        if (err) {
                            fs.writeFileSync(`${componentPath}/es/${item}/style/index.mjs`, 'import \'./index.css\'', { encoding: 'utf-8' })
                        }
                    })
                }
            })
        }
    })

    const dirs2 = fs.readdirSync(`${componentPath}/lib`)
    dirs2.forEach((item) => {
        const file1 = fs.statSync(`${componentPath}/lib/${item}`)
        if (file1.isDirectory()) {
            fs.access(`${componentPath}/lib/${item}/style`, (err) => {
                if (err) {
                    if (item.includes('my-')) { // TODO 用于检测是否是组件
                        fs.mkdirSync(`${componentPath}/lib/${item}/style`)
                        fs.mkdirSync(`${componentPath}/lib/${item}/style/index.css`, '', { encoding: 'utf-8' })
                        fs.writeFileSync(`${componentPath}/lib/${item}/style/index.mjs`, 'require(\'./index.css\')', { encoding: 'utf-8' })
                    }
                }
                else {
                    fs.access(`${componentPath}/lib/${item}/style/index.css`, (err) => {
                        if (err) {
                            fs.writeFileSync(`${componentPath}/lib/${item}/style/index.css`, '', { encoding: 'utf-8' })
                        }
                    })
                    fs.access(`${componentPath}/lib/${item}/style/index.cjs`, (err) => {
                        if (err) {
                            fs.writeFileSync(`${componentPath}/lib/${item}/style/index.mjs`, 'require(\'./index.css\')', { encoding: 'utf-8' })
                        }
                    })
                }
            })
        }
    })
}
