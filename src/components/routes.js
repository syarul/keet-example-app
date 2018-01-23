import Keet from '../../keet/keet'

import loginPage from './loginPage'
import protectedPage from './protectedPage'

class Component extends Keet {
  constructor() {
    super()
  }
  runRoute(route){
    // alert(route)
    route == '/login-page' ? this.loginPage() : 
    route == '/protected-page' ? this.protectedPage() : null
  }
}

const obj = {
  login: {
    tag: 'div',
    id: 'login',
    'k-click': 'loginPage()',
    template: 'login'
  },
  protected: {
    tag: 'div',
    id: 'protected',
    'k-click': 'protectedPage()',
    template: 'protected'
  }
}

const app = new Component

app.loginPage = loginPage
app.protectedPage = protectedPage

export default () => {
  app.mount(obj).link('routes')
  app.runRoute(window.uri)
}