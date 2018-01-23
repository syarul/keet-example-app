import Keet from '../../keet/keet'

class Component extends Keet {
  constructor() {
    super()
    this.state = 'Welcome to our spectacular web page with nothing special here.'
  }
  run(res){
    window.history.pushState({}, 'keet-sample-app', '/')
    if(res) this.state = res
  }
}

const obj = {
  homePage: {
    tag: 'div',
    id: 'homePage',
    template: '{{state}}'
  }
}

const app = new Component

export default res => {
  app.mount(obj).link('content')
  app.run(res)
}