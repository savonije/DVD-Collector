import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import DetailView from '@/views/DetailView.vue'
import AuthView from '@/views/AuthView.vue'
import { useStoreAuth } from '@/stores/storeAuth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/movie/:name/:id',
      name: 'detail',
      component: DetailView
    },
    {
      path: '/login',
      name: 'auth',
      component: AuthView
    }
  ]
})

router.beforeEach(async (to) => {
  const storeAuth = useStoreAuth()
  const userId = storeAuth.user?.id

  if (!userId && to.name !== 'auth') {
    return { name: 'auth' }
  }
})

export default router
