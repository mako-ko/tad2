import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import DashboardView from '../views/DashboardView.vue'
import TaskCreateView from '../views/TaskCreateView.vue'
import TaskEditView from '../views/TaskEditView.vue'
import ProfileView from '../views/ProfileView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import AboutView from '../views/AboutView.vue'

const routes = [
  { path: '/', redirect: '/sobre' },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/cadastro', name: 'register', component: RegisterView },
  { path: '/dashboard', name: 'dashboard', component: DashboardView, meta: { requiresAuth: true } },
  { path: '/tarefas/nova', name: 'task-create', component: TaskCreateView, meta: { requiresAuth: true } },
  { path: '/tarefas/:id/editar', name: 'task-edit', component: TaskEditView, meta: { requiresAuth: true } },
  { path: '/perfil', name: 'profile', component: ProfileView, meta: { requiresAuth: true } },
  { path: '/sobre', name: 'about', component: AboutView },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  const requiresAuth = to.matched.some(route => route.meta.requiresAuth)
  const isAuthenticated = store.getters['auth/isAuthenticated']

  if (requiresAuth && !isAuthenticated) {
    return { name: 'login' }
  }

  if ((to.name === 'login' || to.name === 'register') && isAuthenticated) {
    return { name: 'dashboard' }
  }

  return true
})

export default router
