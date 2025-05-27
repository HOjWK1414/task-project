
import { getToken } from '~/utils/getToken'

const BASE_URL = 'https://api.dms.keysmash.eu'

export function fetchExternal<T>(path: string, token: string, options: any = {}) {
    if (!token) {
        throw new Error('No token no fun :(')
    }

    return $fetch<T>(`${BASE_URL}${path}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            ...options?.headers,
        },
        ...options,
    })
}