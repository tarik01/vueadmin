import { $fetchHttp } from '@/http/requests'
const servicesUrl = {
    loginhttp: '/login',
    logout: '/logout',
    register: '/register',
    baseUrl: '/users'
}

export const authServices = {
    async login({ email, password }) {
        return await $fetchHttp({
            url: `${servicesUrl.baseUrl}${servicesUrl.loginhttp}`,
            method: 'POST',
            data: { email, password }
        })
    },
    async logout() {
        return await $fetchHttp({
            url: `${servicesUrl.baseUrl}${servicesUrl.logout}`,
            method: 'GET'
        })
    },
}
    