import Keet from 'keet'

class Component extends Keet {
  constructor() {
    super()
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

export default run => app.mount(obj).flush('content').link('content')