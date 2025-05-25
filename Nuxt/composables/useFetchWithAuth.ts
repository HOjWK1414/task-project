import { useAuthStore } from '~/stores/auth'

export function useFetchWithAuth<T>(url: string, options: any = {}) {
    const auth = useAuthStore()

    return useFetch<T>(url, {
        ...options,
        headers: {
            ...(options.headers || {}),
            ...(auth.token ? { Authorization: `Bearer ${auth.token}` } : {})
        }
    })
}