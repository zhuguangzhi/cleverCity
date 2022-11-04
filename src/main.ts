import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
//pinia start
import {createPinia} from "pinia";
import piniaPluginPersist from 'pinia-plugin-persist'
//pinia end
import router from "./router";

const store = createPinia()
//piniaPluginPersist pinia持久化插件
store.use(piniaPluginPersist)

const app = createApp(App)
app.config.globalProperties.$router = router
app.config.globalProperties.$store = store
app.use(store)
// 添加路由
app.use(router)
app.mount('#app')
