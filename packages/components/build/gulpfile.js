import gulp from 'gulp'
import {
    buildComponent,
    buildElementStyleWithEs,
    buildElementStyleWithLib,
    buildMissingStyle,
    buildRootStyle,
    buildStyle,
    removeDist,
} from './index.js'

const { series } = gulp

export default series(
    removeDist,
    buildComponent,
    buildStyle,
    buildElementStyleWithEs,
    buildElementStyleWithLib,
    buildRootStyle,
    buildMissingStyle,
)
