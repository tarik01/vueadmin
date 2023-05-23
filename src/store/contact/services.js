import { $fetchHttp } from '@/http/requests'
const servicesUrl = {
    baseUrl: '/contacts',
}

export const contactServices = {
    async getContacts() {
        return await $fetchHttp({
            url: `${servicesUrl.baseUrl}`,
            method: 'GET',
        })
    },
    async updateContact(data) {
        return await $fetchHttp({
            url: `${servicesUrl.baseUrl}/${data.slug}`,
            method: 'PUT',
            data: data
        })
    }
}
