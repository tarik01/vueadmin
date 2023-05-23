import { $fetchHttp } from '@/http/requests'
const servicesUrl = {
    baseUrl: '/pages'
}

export const pageServices = {
    async getPages() {
        return await $fetchHttp({
            url: `${servicesUrl.baseUrl}`,
            method: 'GET',
        })
    },
    async editPage(page) {
        return await $fetchHttp({
            url: `${servicesUrl.baseUrl}/${page.id}`,
            method: 'PUT',
            data: page
        })
    }
}
