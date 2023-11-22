import gulp from 'gulp'
import { buildComponent, buildRootStyle, buildStyle, removeDist } from './index.js'

const { series } = gulp

export default series(
    removeDist,
    buildComponent,
    buildStyle,
    buildRootStyle,
)
