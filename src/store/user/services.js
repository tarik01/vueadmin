import { $fetchHttp } from '@/http/requests'
const servicesUrl = {
    baseUrl: '/users'
}

export const userServices = {
    async getUsers() {
        return await $fetchHttp({
            url: `${servicesUrl.baseUrl}`,
            method: 'GET',
        })
    },
    async createUser(user) {
        return await $fetchHttp({
            url: `${servicesUrl.baseUrl}`,
            method: 'POST',
            data: user
        })
    },
    async editUser(user) {
        return await $fetchHttp({
            url: `${servicesUrl.baseUrl}/${user.id}`,
            method: 'PUT',
            data: user
        })
    }
}
