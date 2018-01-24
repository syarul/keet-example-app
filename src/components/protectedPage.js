import Keet from '../../keet/keet'

class Component extends Keet {
  constructor() {
    super()
    this.protected = ''
  }
  run(res){
    this.protected = res ? 'has-login' : 'not-login'
  }
}

const obj = {
  protectedPage: {
    tag: 'div',
    id: 'protectedPage',
    template: '{{protected}}'
  }
}

const app = new Component

export default res => {
  app.mount(obj).link('content')
  app.run(res)
}