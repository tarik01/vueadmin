import { defineStore } from 'pinia'

import { contactServices } from './services'

export const useContactStore = defineStore({
    id: 'contact',
    state: () => ({
        contacts: [],
        errors: {}
    }),
    actions: {
        async actionGetContacts() {
            try {
                const contacts = await contactServices.getContacts()
                this.contacts = contacts
                return Promise.resolve()
            } catch (error) {
                this.error = 'Ocorreu um erro ao tentar obter as contatos'
                return Promise.reject()
            }
        },
        async actionUpdateContact(contact) {
            try {
                await contactServices.updateContact(contact)
                return Promise.resolve()
            } catch (error) {
                this.error = 'Ocorreu um erro ao tentar atualizar o contato'
                return Promise.reject()
            }
        }
    },
})