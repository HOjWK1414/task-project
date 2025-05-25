
const BASE_URL = 'https://api.dms.keysmash.eu'

export function fetchExternal<T>(path: string, token: string, options: any = {}) {
    return $fetch<T>(`${BASE_URL}${path}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            ...options?.headers,
        },
        ...options,
    })
}