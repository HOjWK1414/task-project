export default defineNuxtRouteMiddleware((to) => {
    const token = useCookie('token')

    const publicRoutes = ['/']

    if (!token.value && !publicRoutes.includes(to.path)) {
        return navigateTo('/')
    }
})