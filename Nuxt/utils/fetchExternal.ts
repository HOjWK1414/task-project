export function fetchExternal<T>(path: string, options: any = {}) {
    return $fetch<T>(`http://localhost:5043/api${path}`, options)
}