import { defineStore } from 'pinia'

import { ErrorUtils } from '../../utils/error-utils'
import { AuthToken } from './TokenClass'
import { authServices } from './services'

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        currentUser: {
            id: null,
            name: null,
            isAdmin: false
        },
        loginErrors: {
            email: '',
            password: '',
            default: ''
        }
    }),
    getters: {
        isLoggedIn() {
            return !!this.currentUser?.id
        },
        getCurrentUser () {
            return this.currentUser
        }
    },
    actions: {          
        actionSetCurrentUser({ id, name, isAdmin }){
            if (JSON.stringify({ id, name, isAdmin }) != JSON.stringify(this.currentUser)){
              this.currentUser = { id, name, isAdmin }
            }
        },
        async actionLogin({ email, password } ) {
            try {
                const { token, user } = await authServices.login({
                    email: email,
                    password
                })
                console.log(user)
                const authToken = new AuthToken()
                authToken.save(token, user)
                this.actionSetCurrentUser({
                    id: authToken.getUserId(),
                    name: authToken.getUserName(),
                    isAdmin: authToken.getIsAdmin()
                });
                return Promise.resolve()
            } catch (error) {
                if (error.response._data) {
                    const errorObjectReceived = ErrorUtils.extractErrorMessagesObject(error.response._data)
                    this.loginErrors = {
                        email: '',
                        password: '',
                        default: '',
                        ...errorObjectReceived
                    }
                }
                else {
                    this.loginErrors.default = 'Ocorreu um erro ao tentar realizar o login'
                }
                return Promise.reject()
            }
        },
        actionLoadTokenFromStorage () {
            const authToken = new AuthToken()
            if (authToken.hasToken()) {
                this.actionSetCurrentUser({
                    id: authToken.getUserId(),
                    name: authToken.getUserName(),
                    isAdmin: authToken.getIsAdmin()
                });
            }
        },
        async actionLogout() {
            try {
                await authServices.logout()
                this.actionSetCurrentUser({
                    id: null,
                    name: null,
                    isAdmin: false
                });
                const authToken = new AuthToken()
                authToken.removeToken()
                return Promise.resolve()
            } catch (error) {
                return Promise.reject()
            }
        },
        actionClearLogin(){
            this.actionSetCurrentUser({
                id: null,
                name: null,
                isAdmin: false
            });
            const authToken = new AuthToken()
            authToken.removeToken()
        }
    },
})