export class AuthToken {
  token  = ''
  userId = ''
  userName = ''
  userEmail = ''
  isAdmin = false

  constructor () {
    this.retrieveFromStorage()
  }

  hasToken () {
    return !!this.token
  }

  retrieveFromStorage () {
    this.token = localStorage.getItem('token') || ''
    this.userId = localStorage.getItem('userId') || ''
    this.userName = localStorage.getItem('userName') || ''
    this.userEmail = localStorage.getItem('userEmail') || ''
    this.isAdmin = localStorage.getItem('isAdmin') || false
  }

  save (token, user) {
    this.token = token
    this.userId = user.id
    this.userName = user.name
    this.userEmail = user.email
    this.isAdmin = !!user.is_admin
    localStorage.setItem('token', token)
    localStorage.setItem('userId', user.id)
    localStorage.setItem('userName', user.name)
    localStorage.setItem('userEmail', user.email)
    localStorage.setItem('isAdmin', user.isAdmin)
  }

  resetUserData () {
    this.userId = ''
    this.userName = ''
    this.userEmail = ''
    this.isAdmin = false
  }

  removeToken () {
    this.token = ''
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('userName')
    localStorage.removeItem('userEmail')
    localStorage.removeItem('isAdmin')
    this.resetUserData()
  }

  getToken () {
    return this.token
  }

  getUserId () {
    return this.userId
  }

  getUserName () {
    return this.userName
  }

  getUserEmail () {
    return this.userEmail
  }

  getIsAdmin () {
    return this.isAdmin
  }
}
