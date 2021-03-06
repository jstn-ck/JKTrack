import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueSession from 'vue-session'

//Persist vue session
var options = {
    persist: true
}


createApp(App).use(router,VueSession, options).mount('#app')
