import {createApp} from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import {createPinia} from "pinia";
import './assets/tailwind.css'
import './assets/colorPalette.css'



const app = createApp(App)

app.use(store)

app.use(createPinia())
app.use(router)
app.mount('#app')
