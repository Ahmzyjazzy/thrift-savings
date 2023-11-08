
import { supabase } from '../lib/supabase'
import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import ThriftView from '@/views/ThriftView.vue'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'home',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/',
      name: 'dashboard',
      component: HomeView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/thrift',
      name: 'thrift',
      component: ThriftView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/unathorised',
      name: 'unathorised',
      component: () => import('../views/AboutView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  let session = null;
  supabase.auth.onAuthStateChange((event, session) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!session) {
        next({ path: '/login' });
      } else {
        next();
      }

    } else {
      // doest not require auth but check if user already logged in
      if (session) {
        next({ path: '/' });
      } else {
        next();
      }
    }
  })
})

export default router
