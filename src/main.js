import { createApp } from 'vue'
import App from './app-shell/AppShell.vue'
import router from './router'
import pinia from './store'
import './style.css'

const app = createApp(App)

app.use(router)
app.use(pinia)

app.mount('#app')
