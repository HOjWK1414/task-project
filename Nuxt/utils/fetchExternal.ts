
import { getToken } from '~/utils/getToken'

const BASE_URL = 'https://api.dms.keysmash.eu'

export function fetchExternal<T>(path: string, options: any = {}) {
    const token = getToken()

    return $fetch<T>(`${BASE_URL}${path}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            ...options?.headers,
        },
        ...options,
    })
}