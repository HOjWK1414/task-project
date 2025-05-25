import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware((to, from) => {
    const auth = useAuthStore()
    if (!auth.user && !['/login', '/register', '/'].includes(to.path)) {
        return navigateTo('/login')
    }
})