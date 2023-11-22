import { withInstall } from '../utils'
import Comp from './index.vue'

export * from './index.vue'
export * from './type'

export const MyButton = withInstall(Comp)
export default MyButton
