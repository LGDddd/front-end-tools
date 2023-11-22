import { createApp } from 'vue'
import Comp from '@lgd/components'
import App from './App.vue'
import '@lgd/components/src/style/index.scss'

const app = createApp(App)
app.use(Comp)
app.mount('#app')
