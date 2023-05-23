import { defineStore } from 'pinia'


export const useDashboardStore = defineStore({
    id: 'dashboard',
    state: () => ({
        component: '',
        page: {
            title: ''
        },
        lastPage: {
            title: '',
            component: ''
        }
    }),
    actions: {
        actionSetParams({ component, title }) {
            this.lastPage.title = this.page.title
            this.lastPage.component = this.component
            this.component = component
            this.page.title = title
        }
    },
})