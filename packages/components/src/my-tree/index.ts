import { withInstall } from '../utils'
import Comp from './index.vue'

export * from './index.vue'
export * from './type'

export const MyTree = withInstall(Comp)
export default MyTree
