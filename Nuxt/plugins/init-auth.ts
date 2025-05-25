import { useAuthStore } from '~/stores/auth'

export default defineNuxtPlugin(() => {
    const auth = useAuthStore()

    if (import.meta.client) {
        const token = localStorage.getItem('token')
        if (token) {
            auth.token = token
        }
    }
})