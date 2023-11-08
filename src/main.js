import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import Vue3Toastify from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import { supabase } from './lib/supabase'
import { userSession } from './vueutils/useAuth'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Vue3Toastify, {
    autoClose: 3000,
});

app.mount('#app')

/**
 * Keeps track of if the user is logged in or out and will update userSession state accordingly.
 */
supabase.auth.onAuthStateChange((event, session) => {
    userSession.value = session
})