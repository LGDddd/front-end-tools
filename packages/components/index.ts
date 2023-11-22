import { makeInstaller } from './src/utils'
import * as Components from './src/index'

export * from './src'

export default makeInstaller([
    Components.MyButton,
])
