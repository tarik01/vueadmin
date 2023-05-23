import { defineStore } from 'pinia'

import { pageServices } from './services'

export const usePageStore = defineStore({
    id: 'page',
    state: () => ({
        pages: [],
        error: ''
    }),
    actions: {
        async actionGetPages() {
            try {
                const pages = await pageServices.getPages()
                this.pages = pages
                return Promise.resolve()
            } catch (error) {
                this.error = 'Ocorreu um erro ao tentar obter as paginas'
                return Promise.reject()
            }
        },
        async actionUpdatePage(page) {
            try {
                await pageServices.editPage(page)
                return Promise.resolve()
            } catch (error) {
                this.error = 'Ocorreu um erro ao tentar editar a pagina'
                return Promise.reject()
            }
        }
    },
})