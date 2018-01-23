import Keet from '../../keet/keet'

class Component extends Keet {
  constructor() {
    super()
    this.protected = 'protected page(not-login)'
  }
  run(){
    window.history.pushState({}, 'protectedPage', 'protected-page')
    fetch('/protected', {
      method: 'post',
      mode: 'same-origin',
      credentials: 'same-origin'
    }).then(res => res.json())
    .then(json => {
      this.protected = json.hasLogin ? 'protected page(HAS-LOGIN)' : 'protected page(not-login)'
      alert(this.protected)
    })
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

export default () => {
  app.mount(obj).link('content')
  app.run()
}