import Keet from 'keet'

class Component extends Keet {
  constructor() {
    super()
  }
  run(){
    window.history.pushState({}, 'protectedPage', 'protected-page')
    fetch('/protected', {
      method: 'post',
      mode: 'same-origin',
      credentials: 'same-origin'
    }).then(res => res.json())
    .then(json => {
    	this.contentUpdate('protectedPage', json.hasLogin ?  'user has login' : 'user is not login')
    })
  }
}

const obj = {
  template: '{{protectedPage}}',
  protectedPage: {
    tag: 'div',
    id: 'protectedPage',
    template: 'protectedPage'
  }
}

const app = new Component

export default () => {
  app.mount(obj).flush('content').link('content')
  app.run()
}