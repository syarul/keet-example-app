import Keet from '../../keet/keet'

import homePage from './homePage'
import loginPage from './loginPage'
import logoutPage from './logoutpage'
import protectedPage from './protectedPage'

class Component extends Keet {
  constructor() {
    super()
    status = ''
  }
  runRoute(route){
    fetch('/protected', {
      method: 'post',
      mode: 'same-origin',
      credentials: 'same-origin'
    }).then(res => res.json())
    .then(json => {
      this.status = json.hasLogin ? 'protected page(HAS-LOGIN)' : 'protected page(not-login)'
      route == '/' ? homePage(null) :
      route == '/login-page' ? this.handleLogin() : 
      route == '/protected-page' ? protectedPage(this.status) : homePage('404 not found')
    })
  }
  handleLogin(){
    this.status != 'protected page(not-login)' ?  logoutPage() : loginPage()
  }
  _protectedPage(){
    this.runRoute('/protected-page')
  }
  _loginPage(){
    this.handleLogin()
  }
  _home(){
    this.runRoute('/')
  }
}

const obj = {
  home: {
    tag: 'div',
    id: 'home',
    'k-click': '_home()',
    template: 'home'
  },
  protected: {
    tag: 'div',
    id: 'protected',
    'k-click': '_protectedPage()',
    template: 'protected'
  },
  login: {
    tag: 'div',
    id: 'login',
    'k-click': '_loginPage()',
    template: 'login'
  }
}

const app = new Component

export default () => {
  app.mount(obj).link('routes')
  app.runRoute(window.uri)
}