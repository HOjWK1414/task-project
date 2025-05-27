export const ROUTES = {
    login: {
        path: '/',
        items: [
            { name: 'Login' },
        ],
    },
    dashboard: {
        path: '/dashboard',
        items: [
            { name: 'Dashboard' },
        ],
    },
    documents: {
        path: '/company/documents',
        items: [
            { name: 'Dashboard', path: '/dashboard' },
            { name: 'Documents of company #{id}' },
        ],
    },
}