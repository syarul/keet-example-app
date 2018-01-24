import Keet from '../../keet/keet'

import renderProcessing from './renderProcessing'

class Component extends Keet {
  constructor() {
    super()
  }
  logout(){
    fetch('/api/logout', {
      method: 'post',
      mode: 'same-origin',
      credentials: 'same-origin',
      cache: 'no-cache',
      headers: {
        'content-type': 'application/x-www-form-urlencoded; charset=utf-8'
      },
    }).then(res => res.json())
    .then(json => renderProcessing(json, 'logout'))
  }
}

const obj = {
  homePage: {
    tag: 'button',
    'k-click': 'logout()',
    template: 'Logout'
  }
}

const app = new Component

export default res => {
  app.mount(obj).link('content')
}