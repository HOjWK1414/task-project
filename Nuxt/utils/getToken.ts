import { useRequestHeaders, useCookie } from '#app'

export function getToken(): string | undefined {
    if (typeof window === 'undefined') {
        // SSR
        const headers = useRequestHeaders(['cookie'])
        return headers.cookie?.match(/(?:^|;\s*)token=([^;]+)/)?.[1]
    } else {
        // CSR
        return useCookie('token').value?.toString()
    }
}