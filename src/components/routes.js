import Keet from 'keet'

import loginPage from './loginPage'
import protectedPage from './protectedPage'

class Component extends Keet {
  constructor() {
    super()
  }
  _viewLoginPage() {
    loginPage()
  }
  _viewProtectedPage(){
    protectedPage()
  }
}

const obj = {
  template: '{{login}}{{protected}}',
  login: {
    tag: 'div',
    id: 'login',
    'k-click': 'viewLoginPage()',
    template: 'login'
  },
  protected: {
    tag: 'div',
    id: 'protected',
    'k-click': 'viewProtectedPage()',
    template: 'protected'
  }
}

const app = new Component

obj.viewLoginPage = app._viewLoginPage.bind(app)
obj.viewProtectedPage = app._viewProtectedPage.bind(app)

export default run => app.mount(obj).flush('routes').link('routes')