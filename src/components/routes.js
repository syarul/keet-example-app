import Keet from 'keet'

import loginPage from './loginPage'
import protectedPage from './protectedPage'

class Component extends Keet {
  constructor() {
    super()
  }
  runRoute(route){
    // alert(route)
    route == '/login-page' ? loginPage() : 
    route == '/protected-page' ? protectedPage() : null
  }
}

const obj = {
  template: '{{login}}{{protected}}',
  login: {
    tag: 'div',
    id: 'login',
    'k-click': 'loginPage()',
    template: 'login'
  },
  loginPage: loginPage,
  protected: {
    tag: 'div',
    id: 'protected',
    'k-click': 'protectedPage()',
    template: 'protected'
  },
  protectedPage: protectedPage
}

const app = new Component

export default () => {
  app.mount(obj).flush('routes').link('routes')
  app.runRoute(window.uri)
}