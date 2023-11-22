import { makeInstaller } from './utils'
import allInstall from './allInstall'

export * from './components'

export default makeInstaller([...allInstall])
