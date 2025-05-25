export function fetchFromApp<T>(path: string, options: any = {}) {
    return $fetch<T>(`http://localhost:5043/api/internal${path}`, {
        ...options,
        headers: {
            ...options.headers,
            'X-Internal-Request': 'yes'
        }
    })
}