import { defineStore } from 'pinia'

import { userServices } from './services'

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        users: [],
        error: ''
    }),
    actions: {
        async actionGetUsers() {
            try {
                const users = await userServices.getUsers()
                this.users = users
                return Promise.resolve()
            } catch (error) {
                console.log(error)
                this.error = 'Ocorreu um erro ao tentar obter os usuários'
                return Promise.reject()
            }
        },
        async actionCreateUser(user) {
            try {
                await userServices.createUser(user)
                return Promise.resolve()
            } catch (error) {
                this.error = 'Ocorreu um erro ao tentar criar usuário'
                return Promise.reject()
            }
        },
        async actionUpdateUser(user) {
            try {
                await userServices.editUser(user)
                return Promise.resolve()
            } catch (error) {
                this.error = 'Ocorreu um erro ao tentar editar usuário'
                return Promise.reject()
            }
        }
    },
})