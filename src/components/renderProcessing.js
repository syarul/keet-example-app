import Keet from 'keet'

class Component extends Keet {
  constructor() {
    super()
  }

  run(res){
  	var stateObj = { login: res }
  	window.history.pushState(stateObj, res ? 'success': 'failed', res ? 'success-page': 'failed-page')
  }
}

const obj = {
  template: '{{processing}}',
  processing: {
    tag: 'div',
    template: ''
  }
}

const app = new Component

export default res => {
  obj.processing.template = res ? 'success' : 'failed'
  app.mount(obj).flush('content').link('content')
  app.run(res)
}