import Keet from '../../keet/keet'

class Component extends Keet {
  constructor() {
    super()
    this.state = ''
  }

  run(res, type){
  	window.history.pushState({ login: res }, res ? 'success': 'failed', res ? 'success-page': 'failed-page')
    this.state = res ? `success ${type}` : `failed ${type}`
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