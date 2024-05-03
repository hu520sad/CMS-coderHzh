import 'normalize.css'
import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/css/index.less'
import router from './router'
import store from './store'
import useEleIcon from './iconConfig'
import 'element-plus/dist/index.css'



const app = createApp(App)

app.use(useEleIcon)
app.use(store)
app.use(router)
app.mount('#app')
