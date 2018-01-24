import Keet from 'keet'
import { app as routesApp } from 'components/routes'

class Component extends Keet {
  constructor() {
    super()
    this.state = ''
  }
  run(res, type){
  	window.history.pushState({}, res ? 'success': 'failed', res ? 'success-page': 'failed-page')
    this.state = res ? `success ${type}` : `failed ${type}`
    routesApp.updateButton(type == 'login' ? 'logout' : 'login')
  }
}

const obj = {
  processing: {
    tag: 'div',
    template: '{{state}}'
  }
}

const app = new Component

export default (res, type) => {
  app.mount(obj).link('content')
  app.run(res, type)
}