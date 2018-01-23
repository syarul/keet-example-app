import Keet from '../../keet/keet'

class Component extends Keet {
  constructor() {
    super()
    this.state = ''
  }

  run(res){
  	window.history.pushState({ login: res }, res ? 'success': 'failed', res ? 'success-page': 'failed-page')
    this.state = res ? 'success login' : 'failed login'
  }
}

const obj = {
  processing: {
    tag: 'div',
    template: 'login: {{state}}'
  }
}

const app = new Component

export default res => {
  app.mount(obj).link('content')
  app.run(res)
}