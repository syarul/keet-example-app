import Keet from 'keet'

// import homePage from './homePage'
// import loginPage from './loginPage'
// import logoutPage from './logoutpage'
// import protectedPage from './protectedPage'

import router from 'router'

class Component extends Keet {
  constructor() {
    super()
    this.islog = 'login'
  }
  updateButton(res){
    this.islog = res
  }
  protectedPage(){
    router('/protected-page')
  }
  registerPage(){
    router('/register-page')
  }
  loginPage(){
    router('/login-page')
  }
  home(){
    router('/')
  }
  componentDidMount(){
    router()
  }
}

const obj = {
  home: {
    tag: 'div',
    id: 'home',
    'k-click': 'home()',
    template: 'home'
  },
  protected: {
    tag: 'div',
    id: 'protected',
    'k-click': 'protectedPage()',
    template: 'protected'
  },
  register: {
    tag: 'div',
    id: 'register',
    'k-click': 'registerPage()',
    template: 'register'
  },
  login: {
    tag: 'div',
    id: 'login',
    'k-click': 'loginPage()',
    template: '{{islog}}'
  }
}

const app = new Component

const sink = () => app.mount(obj).link('routes')

export {
  sink as default,
  app
}