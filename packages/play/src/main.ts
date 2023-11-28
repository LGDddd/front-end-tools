import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import MyComp from '@lgd_org/components/src/index'
import App from './App.vue'
import '@lgd_org/components/src/index.scss'
import 'element-plus/theme-chalk/index.css'

const app = createApp(App)
app.use(ElementPlus)
app.use(MyComp)
app.mount('#app')
